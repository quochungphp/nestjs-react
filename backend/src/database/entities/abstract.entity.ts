import {
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IAbstractEntity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
}
export abstract class AbstractEntity
  extends BaseEntity
  implements IAbstractEntity
{
  @PrimaryColumn({ generated: true })
  id: number;

  @CreateDateColumn({
    update: false,
    insert: false,
    select: true,
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    update: true,
    insert: false,
    select: true,
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt?: Date;
}
