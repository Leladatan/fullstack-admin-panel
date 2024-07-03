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
import { PostsService } from '@/posts/posts.service';
import { PostsPayloadDto } from '@/posts/dto/posts.dto';
import { Post as PrismaPost, User } from '@prisma/client';
import { ItemsPayloadDto } from '@/utils/items.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Получение всех постов с параметрами

  @Get()
  async getPosts(
    @Query() query: { title: string; limit: string; offset: string },
  ): Promise<ItemsPayloadDto<PrismaPost & { user: User }>> {
    return this.postsService.getPosts({
      title: query.title,
      limit: query.limit,
      offset: query.offset,
    });
  }

  // Создание поста с payload

  @Post()
  async createPost(@Body() payload: PostsPayloadDto): Promise<PrismaPost> {
    return this.postsService.createPost(payload);
  }

  // Редактирование поста по id с payload

  @Patch(':id')
  async updatePostId(
    @Param('id') id: string,
    @Body() payload: PostsPayloadDto,
  ): Promise<PrismaPost & { user: User }> {
    return this.postsService.updatePostId({ id: Number(id), ...payload });
  }

  // Удаление поста по id

  @Delete(':id')
  async deletePostId(@Param('id') id: string): Promise<PrismaPost> {
    return this.postsService.deletePostId(Number(id));
  }
}
