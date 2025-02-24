import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProductsController],
  providers: [ProductService,PrismaClient],
})
export class ProductsModule {}
