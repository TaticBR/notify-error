import { ProcessError } from '../../lib/model/processError.entity';
import { processErrorListMock } from './process-error.mock';

const list: ProcessError[] = Object.assign(processErrorListMock);
export class ProcessErrorRepositoryMock {
  async findPending(): Promise<ProcessError[]> {
    const result = await Promise.resolve(
      list.filter((item) => !item.notificationSent),
    );
    return result;
  }
  async save(processError: ProcessError) {
    processError;
  }
  async updateAsSent(processErrors: ProcessError[]) {
    processErrors;
    list[0].notificationSent = true;
  }
}
