import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.provider';

@Module({
  controllers: [ProductsController],
  providers: [ProductService, PrismaService, PrismaClient,],
})
export class ProductsModule { }
