import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersPayloadDto } from '@/users/dto/users.dto';
import { Post, User } from '@prisma/client';
import { ItemsPayloadDto } from '@/utils/items.dto';
import { defaultTake } from '@/utils/const';
import { PostsService } from '@/posts/posts.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  // Основные функции

  async getUsers({
    username,
    limit,
    offset,
  }: {
    username: string;
    limit: string;
    offset: string;
  }): Promise<ItemsPayloadDto<User>> {
    return this.getUsersItemsPayloadDto({
      username,
      limit: +limit,
      offset: +offset,
    });
  }

  async createUser(payload: UsersPayloadDto): Promise<User> {
    await this.isExistUserData({
      email: payload.email,
      username: payload.username,
    });
    return this.prismaService.user.create({
      data: {
        ...payload,
      },
    });
  }

  async updateUserId({
    id,
    ...payload
  }: UsersPayloadDto & { id: number }): Promise<User> {
    await this.findUserById(id);
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteUserId(id: number): Promise<User> {
    await this.findUserById(id);

    const posts: Post[] = await this.postsService.findManyPostsOnUserId(id);

    if (posts) {
      await this.prismaService.post.deleteMany({
        where: {
          userId: id,
        },
      });
    }

    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  //   Вспомогательные функции

  // Функция для поиска пользователя и обработки ошибки на существование

  async findUserById(id: number): Promise<User> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  // Функция для удобного возвращения данных + пагинация

  async getUsersItemsPayloadDto({
    username,
    limit = 0,
    offset = 10,
  }: {
    username?: string;
    limit: number;
    offset: number;
  }): Promise<ItemsPayloadDto<User>> {
    const isTake: boolean = isNaN(limit);
    const isSkip: boolean = isNaN(offset);

    if (username) {
      const [items, total] = await this.prismaService.$transaction([
        this.prismaService.user.findMany({
          where: { username: { contains: username } },
          take: !isTake ? limit : defaultTake,
          skip: !isSkip ? offset : 0,
          orderBy: {
            id: 'asc',
          },
        }),
        this.prismaService.user.count({
          where: { username: { contains: username } },
        }),
      ]);

      return {
        items,
        total,
      };
    }

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        take: !isTake ? limit : defaultTake,
        skip: !isSkip ? offset : 0,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prismaService.user.count(),
    ]);

    return {
      items,
      total,
    };
  }

  // Проверка на существование пользователя с уникальными данными

  async isExistUserData({
    email,
    username,
  }: {
    email: string;
    username: string;
  }): Promise<void> {
    const isExistEmail: User | null = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (isExistEmail)
      throw new BadRequestException('Поле "Email" уже используется');

    const isExistUsername: User | null =
      await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });

    if (isExistUsername)
      throw new BadRequestException('Поле "Username" уже используется');
  }
}
