import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Engine } from './entities/engine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { NewEngineDto } from './dtos/new-engine.dto';
import { UpdateEngineDto } from './dtos/update-engine.dto';
import {
  baseCylinderVolumeCost,
  baseCylinderVolumeWeight,
  bestCylinderVolume
} from 'src/common/config.utils';

@Injectable()
export class EnginesService {
  constructor(
    @InjectRepository(Engine)
    private readonly engineRepository: Repository<Engine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAllEngines(): Promise<Engine[]> {
    return this.engineRepository.find({
      order: {
        updated_at: 'DESC'
      }
    });
  }

  async getEngineById(engineId: number): Promise<Engine> {
    const engine = await this.engineRepository.findOne({
      where: { id: engineId },
      order: {
        updated_at: 'DESC'
      }
    });

    if (!engine) {
      throw new HttpException('Engine not found', HttpStatus.NOT_FOUND);
    }

    return engine;
  }

  async createEngine(engine: NewEngineDto): Promise<Engine> {
    const user = await this.userRepository.findOne({
      where: { id: engine.userId }
    });
    const cost = await this.valuateEngine(engine);
    const newEngine = this.engineRepository.create({
      ...engine,
      user,
      cost: Math.round(cost.valuation)
    });

    await this.engineRepository.save(newEngine);

    return newEngine;
  }

  async updateEngine(
    engineId: number,
    engine: UpdateEngineDto
  ): Promise<Engine> {
    const updatedEngine = await this.engineRepository.findOne({
      where: { id: engineId }
    });

    if (!updatedEngine) {
      throw new HttpException('Engine not found', HttpStatus.NOT_FOUND);
    }

    const cost = await this.valuateEngine({
      capacity: updatedEngine.capacity,
      cylinders: updatedEngine.cylinders,
      power: updatedEngine.power,
      userId: updatedEngine.user.id,
      name: updatedEngine.name,
      weight: updatedEngine.weight,
      ...engine
    });
    await this.engineRepository.update(engineId, {
      ...engine,
      cost: cost.valuation
    });

    return updatedEngine;
  }

  async getEnginesByUserId(userId: number): Promise<Engine[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const engine = await this.engineRepository.find({
      where: {
        user
      },
      order: {
        updated_at: 'DESC'
      }
    });

    if (!engine) {
      throw new HttpException('Engine not found', HttpStatus.NOT_FOUND);
    }

    return engine;
  }

  async valuateEngine(engine: NewEngineDto): Promise<{
    valuation: number;
    powerCoefficient: number;
  }> {
    const { cylinders, capacity } = engine;

    const bestCylindersNumber = Math.round(capacity / bestCylinderVolume);
    const cylinderVolume = capacity / cylinders / bestCylinderVolume;
    const cylindersValuation =
      (1 +
        Math.sin(Math.min(Math.abs(cylinderVolume - 1), Math.PI)) *
          baseCylinderVolumeWeight) *
      baseCylinderVolumeCost *
      cylinders *
      (Math.abs(cylinders - bestCylindersNumber) / 2 + 1);

    return {
      valuation: cylindersValuation,
      powerCoefficient: cylinderVolume
    };
  }

  async stopEngineProduction(engineId: number): Promise<string> {
    const engine = await this.engineRepository.findOne({
      where: { id: engineId }
    });

    if (!engine) {
      throw new HttpException('Engine not found', HttpStatus.NOT_FOUND);
    }

    await this.engineRepository.update(engineId, {
      in_production: false
    });

    return 'Engine production stopped';
  }
}
