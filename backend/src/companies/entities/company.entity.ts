import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  money: number;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  user: User;
}
