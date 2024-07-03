import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PostsPayloadDto } from '@/posts/dto/posts.dto';
import { Post, User } from '@prisma/client';
import { ItemsPayloadDto } from '@/utils/items.dto';
import { UsersService } from '@/users/users.service';
import { defaultTake } from '@/utils/const';

@Injectable()
export class PostsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  // Основные функции

  async getPosts({
    title,
    limit,
    offset,
  }: {
    title: string;
    limit: string;
    offset: string;
  }): Promise<ItemsPayloadDto<Post & { user: User }>> {
    return this.getPostsItemsPayloadDto({
      title,
      limit: +limit,
      offset: +offset,
    });
  }

  async createPost({ userId, ...payload }: PostsPayloadDto): Promise<Post> {
    await this.usersService.findUserById(userId);
    return this.prismaService.post.create({
      data: {
        ...payload,
        user: { connect: { id: userId } },
      },
    });
  }

  async updatePostId({
    id,
    userId,
    ...payload
  }: PostsPayloadDto & { id: number }): Promise<Post & { user: User }> {
    await this.findPostById(id);
    await this.usersService.findUserById(userId);
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...payload,
        user: { connect: { id: userId } },
      },
      include: {
        user: true,
      },
    });
  }

  async deletePostId(id: number): Promise<Post> {
    await this.findPostById(id);
    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }

  // Вспомогательные функции

  // Функция для поиска поста и проверки на сушествование

  async findPostById(id: number): Promise<Post & { user: User }> {
    const post: (Post & { user: User }) | null =
      await this.prismaService.post.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });

    if (!post) throw new NotFoundException('Пост не найден');

    return post;
  }

  // Функция для удобного возвращения данных + пагинация

  async getPostsItemsPayloadDto({
    title,
    limit = 0,
    offset = 10,
  }: {
    title?: string;
    limit: number;
    offset: number;
  }): Promise<ItemsPayloadDto<Post & { user: User }>> {
    const isTake: boolean = isNaN(limit);
    const isSkip: boolean = isNaN(offset);

    if (title) {
      const [items, total] = await this.prismaService.$transaction([
        this.prismaService.post.findMany({
          where: { title: { contains: title } },
          take: !isTake ? limit : defaultTake,
          skip: !isSkip ? offset : 0,
          orderBy: {
            id: 'asc',
          },
          include: {
            user: true,
          },
        }),
        this.prismaService.post.count({
          where: { title: { contains: title } },
        }),
      ]);

      return {
        items,
        total,
      };
    }

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.post.findMany({
        take: !isTake ? limit : defaultTake,
        skip: !isSkip ? offset : 0,
        orderBy: {
          id: 'asc',
        },
        include: {
          user: true,
        },
      }),
      this.prismaService.post.count(),
    ]);

    return {
      items,
      total,
    };
  }

  async findManyPostsOnUserId(userId: number): Promise<Post[]> {
    return this.prismaService.post.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteManyPostsOnUserId(userId: number) {
    return this.prismaService.post.deleteMany({
      where: {
        userId,
      },
    });
  }
}
