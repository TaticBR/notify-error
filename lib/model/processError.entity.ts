import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const processErrorCollectionName =
  process.env.PROCESS_ERROR_COLLECTION_NAME || 'processError';

@Schema({ collection: processErrorCollectionName })
export class ProcessError {
  constructor({
    error,
    errorType,
    shouldSendNotification,
  }: Partial<ProcessError>) {
    if (errorType) {
      this.errorType = errorType;
    }

    this.error = error;
    this.notificationSent = shouldSendNotification || false;
    this.shouldSendNotification = shouldSendNotification;
  }

  @Prop()
  error: string;

  @Prop()
  errorType?: string;

  @Prop()
  notificationSent?: boolean;

  @Prop()
  shouldSendNotification?: boolean;
}

export type ProcessErrorDocument = ProcessError & Document;

export const ProcessErrorSchema = SchemaFactory.createForClass(ProcessError);
