import { Document, Schema } from 'mongoose';

export const processErrorCollectionName =
  process.env.PROCESS_ERROR_COLLECTION_NAME || 'processError';

const padTwo = (num: string | number) => {
  num = num.toString();
  while (num.length < 2) num = '0' + num;
  return num;
}

export class ProcessError {
  constructor(payload?: Partial<ProcessError>) {
    if (payload) {
      const { error, errorType, shouldSendNotification, errorData } = payload;
      if (errorType) {
        this.errorType = errorType;
      }

      this.error = error;
      this.errorData = errorData;
      this.notificationSent = shouldSendNotification || false;
      this.shouldSendNotification = shouldSendNotification;
      this.createdAt = new Date(Date.now());
    }
  }

  error: string;

  errorData: string; // should be json data

  errorType?: string;

  notificationSent?: boolean;

  shouldSendNotification?: boolean;

  createdAt?: Date;

  getSchema() {
    const schema = new Schema({
      error: { type: String, required: true },
      errorData: { type: String, required: true },
      errorType: { type: String, required: false },
      notificationSent: { type: Boolean, required: false },
      shouldSendNotification: { type: Boolean, required: false },
      createdAt: { type: Date, required: false },
    });

    const proto = ProcessError.prototype;
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name != 'constructor' && typeof proto[name] === 'function') {
        schema.methods[name] = proto[name];
      }
    }

    return schema;
  }

  getErrorMessage() {
    return `${this.getCreatedAtFormated()} - ${this.error}`;
  }

  getCreatedAtFormated() {
    const createdAt = new Date(this.createdAt);

    const day = createdAt.getDate();
    const month = padTwo(createdAt.getMonth() + 1);
    const year = padTwo(createdAt.getFullYear());
    const hour = padTwo(createdAt.getHours());
    const minute = padTwo(createdAt.getMinutes());
    const second = padTwo(createdAt.getSeconds());

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  }
}

export type ProcessErrorDocument = ProcessError & Document;
