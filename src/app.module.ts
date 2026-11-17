import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module.js';
import { ClientsModule } from '@nestjs/microservices';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClientsModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
