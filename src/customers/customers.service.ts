import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService){}
 async create(createCustomerDto: CreateCustomerDto) {
const customer = await this.prisma.customer.create({
      data: createCustomerDto
    });
    return customer;  }


  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const totalCategory = await this.prisma.customer.count({
      where: { available: true }
    });

    const lastPage = Math.ceil(totalCategory / limit);

    return {
      data: await this.prisma.customer.findMany({
        where: { available: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalCategory,
        page: page,
        lastPage: lastPage,
      },
    };
  }

    async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id, available: true },
    });
    if (!customer) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Customer with ID ${id} not found`

      });
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { id: ___, ...data } = updateCustomerDto;
    await this.findOne(id);
    return this.prisma.customer.update({
      where: { id: id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    //hard delete
    /*  return this.prisma.product.delete({
        where: { id: id },
      });
      */
    //soft delete

    const customer = await this.prisma.customer.update({
      where: { id: id },
      data: {
        available: false,
      },
    });
    return {
      status: 200,
      msg: 'customer deleted successfully',
      product: customer,

    }
  }
}
