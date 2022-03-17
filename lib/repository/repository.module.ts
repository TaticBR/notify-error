import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessError, ProcessErrorSchema } from '../model/processError.entity';
import { ProcessErrorMongoRepository } from './processError-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProcessError.name,
        schema: ProcessErrorSchema,
      },
    ]),
  ],
  exports: [ProcessErrorMongoRepository]
})
export class RepositoryModule {}
