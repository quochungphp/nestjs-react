import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../database/entities/abstract.entity';

export enum LOGIN_PROVIDER {
  PASSWORD = 'PASSWORD',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}
export const USER_TABLE = 'user';

@Entity(USER_TABLE)
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({
    type: 'enum',
    enum: LOGIN_PROVIDER,
    enumName: 'LOGIN_PROVIDER',
  })
  loginProvider: LOGIN_PROVIDER;
}
