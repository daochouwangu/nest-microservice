import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Controller()
export class PaymentsMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @EventPattern('createPayment')
  createUser(@Payload() data: CreatePaymentDto) {
    console.log('createPayment', data);
    this.natsClient.emit('paymentCreated', data);
    return data;
  }
}
