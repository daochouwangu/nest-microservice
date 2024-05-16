import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createUser(@Body() createPaymentDto: CreatePaymentDto) {
    // return this.natsClient.send({ cmd: 'create_payments' }, createPaymentsDto);
    this.natsClient.emit('createPayment', createPaymentDto);
  }
}
