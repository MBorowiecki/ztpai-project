import { Module } from '@nestjs/common';
import { EnginesController } from './engines.controller';
import { EnginesService } from './engines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engine } from './entities/engine.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Engine, User])],
  controllers: [EnginesController],
  providers: [EnginesService]
})
export class EnginesModule {}
