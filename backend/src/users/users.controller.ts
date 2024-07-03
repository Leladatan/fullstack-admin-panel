import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { ItemsPayloadDto } from '@/utils/items.dto';
import { User } from '@prisma/client';
import { UsersPayloadDto } from '@/users/dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Получение всех пользователей с параметрами

  @Get()
  async getUsers(
    @Query() query: { username: string; limit: string; offset: string },
  ): Promise<ItemsPayloadDto<User>> {
    return this.usersService.getUsers({
      username: query.username,
      limit: query.limit,
      offset: query.offset,
    });
  }

  // Создание пользователя и получение payload

  @Post()
  async createUser(@Body() payload: UsersPayloadDto): Promise<User> {
    return this.usersService.createUser(payload);
  }

  // Редактирование пользователя по id с payload

  @Patch(':id')
  async updateUserId(
    @Param('id') id: string,
    @Body() payload: UsersPayloadDto,
  ): Promise<User> {
    return this.usersService.updateUserId({ id: Number(id), ...payload });
  }

  // Удаление пользователя по id

  @Delete(':id')
  async deleteUserId(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserId(Number(id));
  }
}
