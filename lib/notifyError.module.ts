import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveErrorProvider } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { ProcessErrorMongoRepository } from './repository/processError-mongo.repository';
import { ProcessError, ProcessErrorSchema } from './model/processError.entity';
import { EventEmitterPort } from './ports/eventEmitter.port';
import { connectionName } from './config';

@Module({})
export class NotifyErrorModule  {
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

    return {
      module: NotifyErrorModule,
      imports: [
        MongooseModule.forRoot(options.mongoUrl, { connectionName }),
        MongooseModule.forFeature(
          [
            {
              name: ProcessError.name,
              schema: ProcessErrorSchema,
            },
          ],
          connectionName,
        ),
      ],
      providers: [
        ...notificationProviders,
        ProcessErrorMongoRepository,
        SaveErrorProvider,
      ],
      exports: [ProcessErrorMongoRepository, SaveErrorProvider],
    };
  }
}
