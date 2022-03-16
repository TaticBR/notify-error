import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveError } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { ProcessErrorMongoRepository } from 'repository/processError-mongo.repository';

@Module({
  providers: [NotifyError, SaveError, ProcessErrorMongoRepository],
})
export class NotifyErrorModule {
  static forRoot(options?: NotifyErrorOptions): DynamicModule {
    const providers = [options.eventEmmiterProvider]
    return {
      global: true,
      module: NotifyErrorModule,
      imports: [MongooseModule.forRoot(options.mongoUrl)],
      providers: providers,
    };
  }
}
