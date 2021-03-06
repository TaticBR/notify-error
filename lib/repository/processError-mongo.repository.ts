import { Injectable } from '@nestjs/common';
import {
  ProcessError,
  ProcessErrorDocument,
  processErrorCollectionName,
} from '../model/processError.entity';
import mongoose, { Model, Schema } from 'mongoose';

@Injectable()
export class ProcessErrorMongoRepository {
  processErrorSchema: Schema<ProcessErrorDocument>;
  processErrorModel: Model<ProcessError>;

  constructor(mongoUrl?: string) {
    if (mongoUrl) {
      this.connectMongo(mongoUrl);
    }
  }

  async connectMongo(mongoUrl: string) {
    await mongoose.connect(mongoUrl);
    this.processErrorSchema = new ProcessError().getSchema();
    this.processErrorModel = mongoose.model(
      processErrorCollectionName,
      this.processErrorSchema,
      processErrorCollectionName,
    );
  }

  async findPending(): Promise<ProcessErrorDocument[]> {
    if(!this.processErrorSchema) { return [] }

    const result = await this.processErrorModel.find({
      notificationSent: false,
    });
    return result;
  }

  async save(processError: ProcessError): Promise<void> {
    if(!this.processErrorSchema) { return }

    const createdError = new this.processErrorModel(processError);

    await createdError.save();
  }

  async updateAsSent(processErrors: ProcessErrorDocument[]): Promise<void> {
    if(!this.processErrorSchema) { return }

    await Promise.all(
      processErrors.map((processError) => {
        processError.notificationSent = true;

        processError.isNew = false;
        return processError.save();
      }),
    );
  }
}
