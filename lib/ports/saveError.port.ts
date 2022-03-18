export abstract class SaveErrorPort {
    save: (error: string, errorType?: string) => Promise<void>;
  }
  