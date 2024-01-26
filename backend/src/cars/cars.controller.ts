import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { CarsService } from './cars.service';
import { NewCarDto } from './dtos/new-car.dto';
import {
  createBadRequestResponse,
  createErrorResponse,
  createOkResponse
} from 'src/common/response.utils';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
@UseGuards(AuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getAll() {
    try {
      const res = await this.carsService.getAll();

      return createOkResponse(res);
    } catch (err) {
      return createBadRequestResponse(err.message, err.status);
    }
  }

  @Get(':id')
  async getById(@Param('id') carId: number) {
    try {
      const res = await this.carsService.getById(carId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Get('user/:id')
  async getByUserId(@Param('id') userId: number) {
    try {
      const res = await this.carsService.getByUserId(userId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('create')
  async create(@Body() car: NewCarDto) {
    try {
      const res = await this.carsService.create(car);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('update/:id')
  async update(@Param('id') carId: number, @Body() car: UpdateCarDto) {
    try {
      const res = await this.carsService.update(carId, car);

      return createOkResponse<Car>(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('valuate')
  async valuate(@Body() car: NewCarDto) {
    try {
      const res = await this.carsService.valuate(car);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Put('stop-production/:id')
  async stopProduction(@Param('id') engineId: number) {
    try {
      const res = await this.carsService.stopProduction(engineId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }
}
