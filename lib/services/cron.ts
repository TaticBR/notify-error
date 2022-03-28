import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitterPort } from '../ports/eventEmitter.port';
import { ProcessErrorMongoRepository } from '../repository/processError-mongo.repository';
import { GroupedError } from '../interfaces/groupedError';

@Injectable()
export class NotifyError {
  private readonly logger = new Logger(NotifyError.name);

  constructor(
    private readonly processErrorRepository: ProcessErrorMongoRepository,
    private readonly eventEmitter: EventEmitterPort,
  ) {}

  @Cron(process.env.VERIFY_ERROR_SCHEDULE_CRON || CronExpression.EVERY_10_SECONDS)
  async notify(): Promise<void> {
    this.logger.verbose(
      `Notify Load Pim Error started to sending notification`,
    );

    const pendingErrors = await this.processErrorRepository.findPending();

    if (!pendingErrors || !pendingErrors.length) {
      this.logger.log('No notifications to send');
      return;
    }

    this.logger.verbose(
      `Found process errors to send notifications: ${JSON.stringify(
        pendingErrors,
      )}`,
    );

    const errorsGroupedByType: GroupedError[] = pendingErrors.reduce(
      (previous, current) => {
        if (!previous.find((item) => item.errorType === current.errorType)) {
          return [
            ...previous,
            {
              errorType: current.errorType,
              errors: [current.error],
            },
          ];
        }
        const currentList = previous.find(
          (item) => item.errorType === current.errorType,
        );
        currentList.errors = [...currentList.errors, current.error];

        return previous;
      },
      [],
    );

    this.logger.log('Sending notification');
    try {
      await Promise.all(errorsGroupedByType.map(async (error: GroupedError) => {
        await this.eventEmitter.request(
          process.env.EVENT_EMITTER_TOPIC || 'NotifyLoadPimDelayTopic',
          {
            errorType: error.errorType,
            error: error.errors,
          },
        );
      }));

      await this.processErrorRepository.updateAsSent(pendingErrors);
      this.logger.log('Notification sent');
    } catch (error) {
      this.logger.error(`Error while sending notification ${error.message}`);
    }
  }
}
