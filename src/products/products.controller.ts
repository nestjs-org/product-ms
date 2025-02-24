import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/dto.pagination';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { from, of } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  @MessagePattern({cmd:'create-product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern({cmd:'get-all-products'})
  findAll(@Payload() pagination: PaginationDto) {
    return this.productService.findAll(pagination);
  }

  // @Get(':id')
  @MessagePattern({cmd:'get-one-product'})
  findOne(@Payload('id',ParseIntPipe) id:number ) {
    return this.productService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({cmd:'edit-one-product'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({cmd:'delete-one-product'})
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.productService.remove(+id);
  }
  @MessagePattern({cmd:'check-ids-products'})
  validate(@Payload() ids: number[]) {
    //recive the message from the orders-microservice to sent back the data
    return this.productService.validateProducts(ids)
  }
}
