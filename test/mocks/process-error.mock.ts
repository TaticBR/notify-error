import { ProcessError } from '../../lib/model/processError.entity';

export const processErrorMock = new ProcessError({error: 'error', errorType: 'error'});

export const processErrorListMock = [processErrorMock];
