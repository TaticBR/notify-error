import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveNotifyError } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { ProcessErrorMongoRepository } from './repository/processError-mongo.repository';
import { ProcessError, ProcessErrorSchema } from './model/processError.entity';
import { EventEmitterPort } from './ports/eventEmitter.port';

@Module({})
export class NotifyErrorModule {
  static forRoot(options?: NotifyErrorOptions): any {
    return {
      module: NotifyErrorModule,
      imports: [
        MongooseModule.forFeature([
          {
            name: ProcessError.name,
            schema: ProcessErrorSchema,
          },
        ]),
      ],
      providers: [
        {
          provide: EventEmitterPort,
          useClass: options.eventEmitterAdapter,
        },
        ProcessErrorMongoRepository,
        NotifyError,
        SaveNotifyError,
      ],
      exports: [
        ProcessErrorMongoRepository,
        SaveNotifyError,
      ]
    };
  }
}
