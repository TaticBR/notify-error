import { Module } from '@nestjs/common';
import { SaveNotifyError } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { ProcessErrorMongoRepository } from './repository/processError-mongo.repository';
import { EventEmitterPort } from './ports/eventEmitter.port';

@Module({})
export class NotifyErrorModule {
  // TODO: fix return type, changing to DynamicModule or similiar. It's returning abnormal error
  static forRoot(options?: NotifyErrorOptions): any {
    const notificationProviders = options.eventEmitterAdapter
      ? [
          {
            provide: EventEmitterPort,
            useClass: options.eventEmitterAdapter,
          },
          NotifyError,
        ]
      : [];

    const repositoryFactory = {
      provide: ProcessErrorMongoRepository,
      useFactory: () => {
        return new ProcessErrorMongoRepository(options.mongoUrl);
      },
    };

    const providers = [
      ...notificationProviders,
      repositoryFactory,
      SaveNotifyError,
    ];

    return {
      module: NotifyErrorModule,
      providers,
      exports: providers,
    };
  }
}
