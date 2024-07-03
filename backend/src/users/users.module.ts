import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PostsModule } from '@/posts/posts.module';

@Module({
  imports: [forwardRef(() => PostsModule)],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
