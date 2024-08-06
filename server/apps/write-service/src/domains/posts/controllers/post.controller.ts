import { JwtAuthGuard } from '@app/common/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/post.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from '@app/common/entities';
import { PostService } from '../services/post.service';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    const post = await this.postService.createPost(user, createPostDto);
    return post;
  }
}
