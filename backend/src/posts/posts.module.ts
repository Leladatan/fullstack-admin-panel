import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from '@/posts/posts.controller';
import { PostsService } from '@/posts/posts.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
