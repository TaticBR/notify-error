import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactoryWithMethods } from '../utils/schema-factory-with-methods';

export const processErrorCollectionName = 'processError';

@Schema({ collection: processErrorCollectionName })
export class ProcessError {
  constructor(error?: string) {
    if (error) {
      this.error = error;
    }
    this.notificationSent = false;
  }
  @Prop()
  error: string;

  @Prop()
  notificationSent?: boolean;
}

export type ProcessErrorDocument = ProcessError & Document;

export const ProcessErrorSchema =
  SchemaFactoryWithMethods.createForClass(ProcessError);
