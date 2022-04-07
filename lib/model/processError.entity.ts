import { Document, Schema } from 'mongoose';

export const processErrorCollectionName =
  process.env.PROCESS_ERROR_COLLECTION_NAME || 'processError';

export class ProcessError {
  constructor(payload?: Partial<ProcessError>) {
    if (payload) {
      const { error, errorType, shouldSendNotification } = payload;
      if (errorType) {
        this.errorType = errorType;
      }

      this.error = error;
      this.notificationSent = shouldSendNotification || false;
      this.shouldSendNotification = shouldSendNotification;
      this.createdAt = new Date(Date.now());
    }
  }

  error: string;

  errorType?: string;

  notificationSent?: boolean;

  shouldSendNotification?: boolean;

  createdAt?: Date;

  getSchema() {
    return new Schema({
      error: { type: String, required: true },
      errorType: { type: String, required: false },
      notificationSent: { type: Boolean, required: false },
      shouldSendNotification: { type: Boolean, required: false },
      createdAt: { type: Date, required: false },
    });
  }
}

export type ProcessErrorDocument = ProcessError & Document;
