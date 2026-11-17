import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto.js';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
 @IsNumber()
@IsPositive()
id!: number;

}
