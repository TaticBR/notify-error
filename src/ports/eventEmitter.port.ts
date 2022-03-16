export abstract class EventEmitterPort {
  request: (topic: string, payload: unknown) => Promise<void>;
}
