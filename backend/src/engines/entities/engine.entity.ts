import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cylinders: number;

  @Column()
  power: number;

  @Column()
  capacity: number;

  @Column()
  cost: number;

  @Column()
  weight: number;

  @Column({
    type: 'boolean',
    default: false
  })
  in_production: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date;
}
