import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern({cmd:'createCustomer'})
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @MessagePattern({cmd:'findAllCustomers'})
  findAll(@Payload() PaginationDto: PaginationDto) {
    return this.customersService.findAll(PaginationDto);
  }

  @MessagePattern({cmd:'findOneCustomer'})
  findOne(@Payload('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @MessagePattern({cmd:'updateCustomer'})
  update(@Payload() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(updateCustomerDto.id, updateCustomerDto);
  }

  @MessagePattern({cmd:'deleteCustomer'})
  remove(@Payload() id: string) {
    return this.customersService.remove(+id);
  }
}
