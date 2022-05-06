export interface NotifyErrorOptions {
    // TODO: fix return type, changing to specific adapter following event emitter port
    eventEmitterAdapter?: any;
    mongoUrl?: string;
    imports?: any[];
}
