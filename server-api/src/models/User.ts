import * as bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseDeleteEntity } from '../infrastructure/databases/common/BaseDeleteEntity';
import { Role } from './Role';

@Entity('user')
export class User extends BaseDeleteEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: true,
  })
  uuid?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'bigint', nullable: true })
  roleId?: number;
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role?: Role;

  async hashPassword(password: string) {
    this.password = await bcrypt.hashSync(password || this.password, 8);
  }

  checkIfPasswordMatch(password: string) {
    return bcrypt.compareSync(password, String(this.password));
  }
}
