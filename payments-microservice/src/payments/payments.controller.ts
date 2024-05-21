import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private paymentsService: PaymentsService,
  ) {}
  @EventPattern('createPayment')
  async createUser(@Payload() data: CreatePaymentDto) {
    const res = await this.paymentsService.createPayment(data);
    this.natsClient.emit('paymentCreated', data);
    return res;
  }
}
