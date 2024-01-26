import { User } from 'src/auth/entities/user.entity';
import { Engine } from 'src/engines/entities/engine.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum CarBodyType {
  HATCHBACK = 'Hatchback',
  SEDAN = 'Sedan',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  SUV = 'SUV',
  PICKUP = 'Pickup'
}

export enum CarBodyMaterial {
  STEEL = 'Steel',
  ALUMINIUM = 'Aluminium',
  CARBON_FIBER = 'Carbon Fiber',
  PLASTIC = 'Plastic'
}

export enum CarSegment {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  S = 'S',
  M = 'M',
  J = 'J'
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CarBodyType
  })
  body_type: CarBodyType;

  @Column()
  number_of_seats: number;

  @Column({
    type: 'enum',
    enum: CarBodyMaterial
  })
  car_body_material: CarBodyMaterial;

  @Column()
  cost: number;

  @Column({
    type: 'enum',
    enum: CarSegment
  })
  car_segment: CarSegment;

  @Column({
    type: 'boolean',
    default: false
  })
  in_production: boolean;

  @Column({
    type: 'decimal'
  })
  length: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Engine, (engine) => engine.id)
  engine?: Engine;

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
