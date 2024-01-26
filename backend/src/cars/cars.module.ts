import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { User } from 'src/auth/entities/user.entity';
import { Engine } from 'src/engines/entities/engine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User, Engine])],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
