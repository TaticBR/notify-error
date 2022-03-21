import { NotifyError } from '../lib/services/cron';
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessErrorRepositoryMock } from './mocks/process-error-repository.mock';
import { ProcessErrorMongoRepository } from '../lib/repository/processError-mongo.repository';
// import { EventEmitterPort } from 'src/infrastructure/ports';
import { EventEmitterMock } from './mocks/eventEmitter/event-emitter.adapter.mock';
import { EventEmitterPort } from '../lib/ports/eventEmitter.port';

describe(NotifyError.name, () => {
  let service: NotifyError;
  let eventEmitter: EventEmitterMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProcessErrorMongoRepository,
          useClass: ProcessErrorRepositoryMock,
        },
        {
          provide: EventEmitterPort,
          useClass: EventEmitterMock,
        },
        NotifyError,
      ],
    }).compile();

    service = module.get<NotifyError>(NotifyError);
    eventEmitter = module.get<EventEmitterMock>(EventEmitterPort);

    eventEmitter.request = jest.fn();
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should send notification and update as sent if there's pending errors", async () => {
    const result = await service.notify();

    expect(result).toBeUndefined();
    expect(eventEmitter.request).toHaveBeenCalledTimes(1);
  });

  it("should return undefined if there's no pending errors", async () => {
    const result = await service.notify();

    expect(result).toBeUndefined();
    expect(eventEmitter.request).toHaveBeenCalledTimes(0);
  });
});
