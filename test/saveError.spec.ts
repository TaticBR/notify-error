import { SaveNotifyError } from '../lib/services/saveError';
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessErrorRepositoryMock } from './mocks/process-error-repository.mock';
import { ProcessErrorMongoRepository } from '../lib/repository/processError-mongo.repository';

describe(SaveNotifyError.name, () => {
  let service: SaveNotifyError;
  let repository: ProcessErrorRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProcessErrorMongoRepository,
          useClass: ProcessErrorRepositoryMock,
        },
        SaveNotifyError,
      ],
    }).compile();

    service = module.get<SaveNotifyError>(SaveNotifyError);
    repository = module.get<ProcessErrorRepositoryMock>(
      ProcessErrorMongoRepository,
    );

    repository.save = jest.fn();
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save an error', async () => {
    const result = await service.save({ errorType: 'error', error: 'error' });

    expect(result).toBeUndefined();
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
