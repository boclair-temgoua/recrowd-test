import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseDeleteEntity } from '../infrastructure/databases/common/BaseDeleteEntity';

@Entity('investment')
export class Investment extends BaseDeleteEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: true,
  })
  uuid?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  currency?: string;

  @Column({ nullable: true, type: 'timestamptz' })
  expiredMaxAt?: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  expiredMinAt?: Date;

  @Column({ default: true })
  status?: boolean;

  @Column({ type: 'float', nullable: true })
  amount?: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'bigint', nullable: true })
  userId?: number;
}
