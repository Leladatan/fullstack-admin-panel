import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

// Объявление, что данный класс будет глобальным в данном проекте без нужны импорта самостоятельно

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
