import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule.register()],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
