import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { NewCompanyDto } from './dtos/new-company.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  async createCompany(newCompanyDto: NewCompanyDto): Promise<Company> {
    const { name, userId } = newCompanyDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const foundCompany = await this.companyRepository.findOne({
      where: { name }
    });

    if (foundCompany) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const company = this.companyRepository.create({
      money: 100000,
      name,
      user
    });

    user.company = company;

    await this.userRepository.save(user);

    await this.companyRepository.save(company);

    return company;
  }
}
