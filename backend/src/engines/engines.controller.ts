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
import { EnginesService } from './engines.service';
import { NewEngineDto } from './dtos/new-engine.dto';
import {
  createBadRequestResponse,
  createErrorResponse,
  createOkResponse
} from 'src/common/response.utils';
import { Engine } from './entities/engine.entity';

@Controller('engines')
@UseGuards(AuthGuard)
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Get()
  async getAllEngines() {
    try {
      const res = await this.enginesService.getAllEngines();

      return createOkResponse(res);
    } catch (err) {
      return createBadRequestResponse(err.message, err.status);
    }
  }

  @Get(':id')
  async getEngineById(@Param('id') engineId: number) {
    try {
      const res = await this.enginesService.getEngineById(engineId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Get('user/:id')
  async getEngineByUserId(@Param('id') userId: number) {
    try {
      const res = await this.enginesService.getEnginesByUserId(userId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('create')
  async createEngine(@Body() engine: NewEngineDto) {
    try {
      const res = await this.enginesService.createEngine(engine);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('update/:id')
  async updateEngine(
    @Param('id') engineId: number,
    @Body() engine: NewEngineDto
  ) {
    try {
      const res = await this.enginesService.updateEngine(engineId, engine);

      return createOkResponse<Engine>(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Post('valuate')
  async valuateEngine(@Body() engine: NewEngineDto) {
    try {
      const res = await this.enginesService.valuateEngine(engine);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }

  @Put('stop-production/:id')
  async stopProduction(@Param('id') engineId: number) {
    try {
      const res = await this.enginesService.stopEngineProduction(engineId);

      return createOkResponse(res);
    } catch (err) {
      return createErrorResponse(err.message, err.status);
    }
  }
}
