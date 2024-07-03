import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // Функция для подключения к БД

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  // Функция для прерывания соединения с БД

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
