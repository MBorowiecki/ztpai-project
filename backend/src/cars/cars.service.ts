import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { NewCarDto } from './dtos/new-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import {
  baseCarPricePerMeter,
  carBodyMaterialCostMultiplier,
  carBodyTypeCostMultiplier,
  carSegmentCostMultiplier
} from 'src/common/config.utils';
import { Engine } from 'src/engines/entities/engine.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Engine)
    private readonly engineRepository: Repository<Engine>
  ) {}

  async getAll(): Promise<Car[]> {
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.engine', 'engine')
      .getMany();
  }

  async getById(carId: number): Promise<Car> {
    const car = await this.carRepository
      .createQueryBuilder('car')
      .where({ id: carId })
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.engine', 'engine')
      .getOne();

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return car;
  }

  async create(car: NewCarDto): Promise<Car> {
    const user = await this.userRepository.findOne({
      where: { id: car.userId }
    });
    const engine = await this.engineRepository.findOne({
      where: { id: car.engineId }
    });
    const cost = await this.valuate(car);
    const newCar = this.carRepository.create({
      ...car,
      user,
      engine,
      cost: Math.round(cost.valuation)
    });

    await this.carRepository.save(newCar);

    return newCar;
  }

  async update(carId: number, car: UpdateCarDto): Promise<Car> {
    const updatedCar = await this.carRepository
      .createQueryBuilder('car')
      .where({ id: carId })
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.engine', 'engine')
      .getOne();

    if (!updatedCar) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    const cost = await this.valuate({
      body_type: updatedCar.body_type,
      car_body_material: updatedCar.car_body_material,
      car_segment: updatedCar.car_segment,
      name: updatedCar.name,
      number_of_seats: updatedCar.number_of_seats,
      userId: updatedCar.user.id,
      engineId: updatedCar.engine?.id,
      ...car
    });

    let engine = updatedCar.engine;

    if (
      (engine === null && car.engineId !== null) ||
      engine.id !== car.engineId
    ) {
      engine = await this.engineRepository.findOne({
        where: { id: car.engineId }
      });
    }

    await this.carRepository.update(carId, {
      body_type: car.body_type,
      car_body_material: car.car_body_material,
      car_segment: car.car_segment,
      name: car.name,
      number_of_seats: car.number_of_seats,
      length: car.length,
      created_at: updatedCar.created_at,
      updated_at: updatedCar.updated_at,
      in_production: car.in_production,
      id: updatedCar.id,
      user: updatedCar.user,
      engine,
      cost: cost.valuation
    });

    return updatedCar;
  }

  async getByUserId(userId: number): Promise<Car[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const cars = await this.carRepository
      .createQueryBuilder('car')
      .where({
        user
      })
      .orderBy('car.updated_at', 'DESC')
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.engine', 'engine')
      .getMany();

    return cars;
  }

  async valuate(car: NewCarDto): Promise<{
    valuation: number;
  }> {
    const lengthValuation = (car.length * baseCarPricePerMeter) / 1000;
    const totalMultiplier =
      carSegmentCostMultiplier[car.car_segment] +
      carBodyTypeCostMultiplier[car.body_type] +
      carBodyMaterialCostMultiplier[car.car_body_material];

    const totalValuation = lengthValuation * totalMultiplier;

    return {
      valuation: totalValuation
    };
  }

  async stopProduction(carId: number): Promise<string> {
    const car = await this.carRepository.findOne({
      where: { id: carId }
    });

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    await this.carRepository.update(carId, {
      in_production: false
    });

    return 'Car production stopped';
  }
}
