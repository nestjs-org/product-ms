import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, PrismaModule],
})
export class AppModule {}
