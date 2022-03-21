import { Injectable } from '@nestjs/common';

import { EventEmitterPort } from '../../../lib/ports/eventEmitter.port';

@Injectable()
export class EventEmitterMock implements EventEmitterPort {
  async request(topic: string, payload: unknown) {
    topic;
    payload;
    return undefined;
  }
}
