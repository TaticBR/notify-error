import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const processErrorCollectionName = 'processError';

@Schema({ collection: processErrorCollectionName })
export class ProcessError {
  constructor(error: string, errorType?: string) {
    if(errorType) {
      this.errorType = errorType;
    }

    this.error = error;
    this.notificationSent = false;
  }
  
  @Prop()
  error: string;

  @Prop()
  errorType?: string;

  @Prop()
  notificationSent?: boolean;
}

export type ProcessErrorDocument = ProcessError & Document;

export const ProcessErrorSchema =
SchemaFactory.createForClass(ProcessError);
