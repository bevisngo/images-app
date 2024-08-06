import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';

@Module({ controllers: [PostController], providers: [PostService] })
export default class PostsModule {}
