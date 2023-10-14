import { Controller } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Post, Body } from '@nestjs/common';
import { NewCompanyDto } from './dtos/new-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('create')
  createCompany(@Body() newCompanyDto: NewCompanyDto) {
    return this.companiesService.createCompany(newCompanyDto);
  }
}
