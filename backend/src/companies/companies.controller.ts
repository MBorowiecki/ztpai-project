import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Post, Body } from '@nestjs/common';
import { NewCompanyDto } from './dtos/new-company.dto';
import { AuthGuard } from 'src/common/auth.guard';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('create')
  createCompany(@Body() newCompanyDto: NewCompanyDto) {
    return this.companiesService.createCompany(newCompanyDto);
  }

  @Get()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  getUserCompany(@Param('id') userId: string) {
    return this.companiesService.getUserCompany(parseInt(userId));
  }
}
