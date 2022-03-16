import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitterPort } from 'ports/eventEmitter.port';
import { ProcessErrorMongoRepository } from 'repository/processError-mongo.repository';

@Injectable()
export class NotifyError {
  private readonly logger = new Logger(NotifyError.name);

  constructor(private processErrorRepository: ProcessErrorMongoRepository,
    private eventEmitter: EventEmitterPort) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
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
    const errors = pendingErrors.map((item) => item.error);

    this.logger.log('Sending notification');
    try {
      // TODO: get topic dinamically
      await this.eventEmitter.request("NotifyLoadPimDelayTopic", {
      // TODO: get errortype dinamically
        errorType: "Error",
        errors,
      });

      await this.processErrorRepository.updateAsSent(pendingErrors);
      this.logger.log('Notification sent');
    } catch (error) {
      this.logger.error(`Error while sending notification ${error.message}`);
    }
  }
}
