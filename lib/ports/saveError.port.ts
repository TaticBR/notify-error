import { ProcessError } from '../model/processError.entity';

export abstract class SaveErrorPort {
  save: (payload: Partial<ProcessError>) => Promise<void>;
}
