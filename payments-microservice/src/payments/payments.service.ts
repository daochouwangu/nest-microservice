import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async createPayment({ userId, ...CreatePaymentDto }: CreatePaymentDto) {
    const user = await lastValueFrom<User>(
      this.client.send({ cmd: 'getUserById' }, { userId }),
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payment = this.paymentRepository.create({
      ...CreatePaymentDto,
      user,
    });
    return await this.paymentRepository.save(payment);
  }
}
