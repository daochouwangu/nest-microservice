import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersMicroserviceController {
  constructor(private usersService: UsersService) {}
  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
  @EventPattern('paymentCreated')
  handlePaymentCreated(data: any) {
    console.log('paymentCreated', data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(@Payload() data) {
    const { userId } = data;
    const findUser = await this.usersService.getUserById(userId);
    return findUser;
  }
}
