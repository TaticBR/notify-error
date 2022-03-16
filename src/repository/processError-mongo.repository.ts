import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProcessError, ProcessErrorDocument } from 'model/processError.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProcessErrorMongoRepository
{
  constructor(
    @InjectModel(ProcessError.name)
    private readonly processErrorModel: Model<ProcessErrorDocument>,
  ) {}

  async findPending(): Promise<ProcessErrorDocument[]> {
    return this.processErrorModel.find({
      notificationSent: false,
    });
  }

  async save(processError: ProcessError): Promise<void> {
    await this.processErrorModel.create(processError);
  }

  async updateAsSent(processErrors: ProcessErrorDocument[]): Promise<void> {
    await Promise.all(
      processErrors.map((processError) => {
        processError.notificationSent = true;

        processError.isNew = false;
        return processError.save();
      }),
    );
  }
}

