import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './Payment';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 20 })
  username: string;

  @Column({ nullable: false, length: 50 })
  email: string;

  @Column({ nullable: true, length: 20 })
  displayName?: string;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
