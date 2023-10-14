import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Company],
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '4d' },
      secretOrPrivateKey: process.env.JWT_SECRET
    }),
    AuthModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
