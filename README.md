This project contains a code to save errors and send them by notification adapter to your nest.js project.

# Installation

```bash
npm install notify-error
```

or

```bash
yarn add notify-error
```

# How to use

## Implementing on your application

First, import `NotifyErrorModule` and imports it in your module, don't forget to provide your Event Emitter Adapter and mongoDB connection.

Example:

```typescript
import { Module } from '@nestjs/common';
import {
  EventEmitterAdapter,
  EventEmitterProvider,
} from 'src/infrastructure/adapters/eventEmitter/';
import { NotifyErrorModule } from 'notify-error';

@Module({
  imports: [
    NotifyErrorModule.forRoot({
      eventEmitterAdapter: EventEmitterAdapter,
      mongoUrl: 'mongodb://localhost:27017/DBName',
    }),
  ],
  providers: [EventEmitterProvider],
})
export class PimModule {}
```

Event Emitter should follow abstract class definition:

```typescript
export abstract class EventEmitterPort {
  request: (topic: string, payload: unknown) => Promise<void>;
}
```

## Saving error to notify

To save an error, you must import `SaveNotifyError` class, create it instance on your service and use like the following example:

```typescript
import { Injectable } from '@nestjs/common';
import { SaveNotifyError } from 'notify-error';

@Injectable()
export class MyService {
  constructor(private readonly saveError: SaveNotifyError) {}

  private async execute() {
    try {
      // ... execution ...
    } catch (error) {
      this.saveError.save(error.message, 'pim');
    }
  }
}
```

# Configuration

You can configure this module by setting some environemnt variables

| Environment Variables         |                                         Utility                                          |         Default         |
| ----------------------------- | :--------------------------------------------------------------------------------------: | :---------------------: |
| VERIFY_ERROR_SCHEDULE_CRON    | Defines a cron expression to define at what delay the error submit task runner will run. |     every one hour      |
| PROCESS_ERROR_COLLECTION_NAME |                 Defines the mongo collection name to save process errors                 |      processError       |
| EVENT_EMITTER_TOPIC           |           Defines the name of the topic that will be sent to the event emitter           | NotifyLoadPimDelayTopic |
