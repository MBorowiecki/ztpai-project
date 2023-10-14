import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
