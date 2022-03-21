import { ProcessError } from '../../lib/model/processError.entity';

export const processErrorMock = new ProcessError('error');
processErrorMock.errorType = 'error';

export const processErrorListMock = [processErrorMock];
