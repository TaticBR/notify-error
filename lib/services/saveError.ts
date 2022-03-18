import { Injectable, Logger } from '@nestjs/common';
import { ProcessError } from '../model/processError.entity';
import { ProcessErrorMongoRepository } from '../repository/processError-mongo.repository';

@Injectable()
export class SaveNotifyError {
  private readonly logger = new Logger(SaveNotifyError.name);

  constructor(private processErrorRepository: ProcessErrorMongoRepository) {}

  async save(error: string, errorType?: string): Promise<void> {
    this.logger.verbose(`Saving process error to send notification: ${error}`);

    try {
      const processError = new ProcessError(error, errorType);

      this.logger.verbose(
        `Saving process error: ${JSON.stringify(processError)}`,
      );

      await this.processErrorRepository.save(processError);
      this.logger.log('Process Error Saving');
    } catch (error) {
      console.log(error)
      this.logger.error(`Error while saving Process Error ${error.message}`);
    }
  }
}
