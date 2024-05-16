import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller()
export class UsersMicroserviceController {
  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() data: CreateUserDto) {
    console.log(data);
    return data;
  }
  @EventPattern('paymentCreated')
  handlePaymentCreated(data: any) {
    console.log('paymentCreated', data);
  }
}
