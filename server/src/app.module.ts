import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, BlogsModule, PrismaModule, CommentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
