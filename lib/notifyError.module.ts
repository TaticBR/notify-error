import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveError } from './services/saveError';
import { NotifyError } from './services/cron';
import { NotifyErrorOptions } from './index';
import { RepositoryModule } from './repository/repository.module';

@Module({})
export class NotifyErrorModule {
  static forRoot(options?: NotifyErrorOptions): any {
    return {
      module: NotifyErrorModule,
      imports: [
        MongooseModule.forRoot(options.mongoUrl),
        RepositoryModule
      ],
      providers: [
        // options.eventEmmiterProvider,
        NotifyError,
        SaveError,
      ]
    };
  }
}
