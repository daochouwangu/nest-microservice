import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class NatsClientModule {
  static register(): DynamicModule {
    const natsClientConfig = ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats'],
        },
      },
    ]);

    return {
      module: NatsClientModule,
      imports: [natsClientConfig],
      exports: [natsClientConfig],
    };
  }
}
