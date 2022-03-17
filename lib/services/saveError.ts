import { Injectable, Logger } from '@nestjs/common';
import { ProcessError } from 'model/processError.entity';
import { ProcessErrorMongoRepository } from 'repository/processError-mongo.repository';

@Injectable()
export class SaveError {
  private readonly logger = new Logger(SaveError.name);

  constructor(private processErrorRepository: ProcessErrorMongoRepository) {}

  async save(error: string): Promise<void> {
    this.logger.verbose(`Saving process error to send notification: ${error}`);

    if (!error) {
      return;
    }

    const processError = new ProcessError(error);

    this.logger.verbose(
      `Saving process error: ${JSON.stringify(processError)}`,
    );

    try {
      await this.processErrorRepository.save(processError);
      this.logger.log('Process Error Saving');
    } catch (error) {
      this.logger.error(`Error while saving Process Error ${error.message}`);
    }
  }
}
