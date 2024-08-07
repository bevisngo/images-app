import { RedisQueueModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [RedisQueueModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
