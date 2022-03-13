import { Global, Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalModule {}
