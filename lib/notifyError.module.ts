import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveError } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { ProcessErrorMongoRepository } from './repository/processError-mongo.repository';

@Module({})
export class NotifyErrorModule {
  static forRoot(options?: NotifyErrorOptions): any {
    const providers = [
      options.eventEmmiterProvider,
      NotifyError,
      SaveError,
      ProcessErrorMongoRepository,
    ];
    return {
      module: NotifyErrorModule,
      imports: [MongooseModule.forRoot(options.mongoUrl)],
      providers: providers,
    };
  }
}
