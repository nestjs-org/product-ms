import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/dto.pagination';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(private prismaClient: PrismaClient) { }

  async create(createProductDto: CreateProductDto) {
    const productCreated = await this.prismaClient.product.create({ data: createProductDto });

    if (!productCreated) throw new RpcException({
      status: HttpStatus.BAD_REQUEST,
      message: 'Product could not be created'
    });
    return productCreated;

  }

  async findAll(paginationDto: PaginationDto) {
    let { page, limit } = paginationDto;
    const total = await this.prismaClient.product.count({ where: { available: true } });
    let meta = {
      total: total,
      page: page ?? 1,
      lastPage: Math.ceil(total / limit)
    }
    const data = await this.prismaClient.product.findMany({ skip: (page * limit) - limit, take: limit, where: { available: true } });
    return { data, meta }
  }

  async findOne(id: number) {
    const p = await this.prismaClient.product.findUnique({ where: { id: id, available: true } });
    if (!p) throw new RpcException({
      status: HttpStatus.BAD_REQUEST,
      message: 'id with #' + id + ' was not found!'
    });
    return p;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto;
    console.log(_)
    let updated = await this.prismaClient.product.update({
      where: { id: _ },
      data
    })
    return updated;
  }

  remove(id: number) {
    return this.prismaClient.product.update({where:{id},data:{available: false}});
  }

 async validateProducts(ids: number[]){

    const cleanIds = Array.from(new Set(ids));
    const products = await this.prismaClient.product.findMany({
      where:{
        id:{
          in: cleanIds
        }
      }
    });
    if(products.length !== cleanIds.length || !products || ids.length === 0) throw new RpcException({status: 400, message: "some of the products were not found"});
    return products;
  }
}
