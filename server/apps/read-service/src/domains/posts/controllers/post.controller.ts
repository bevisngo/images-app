import { JwtAuthGuard } from '@app/common/auth';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { BaseFilter } from '@app/common/filter/base.filter';
import { User } from '@app/common/entities';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async getPosts(@Query() query: BaseFilter, @CurrentUser() user: User) {
    const posts = await this.postService.getPosts(query, user);
    return posts;
  }

  @Get('/home')
  public async getPostsHome(@Query() query: BaseFilter) {
    return await this.postService.getPostsHome(query);
  }

  @Get(':id')
  public async getPost(@Param('id') id: number) {
    return await this.postService.getPost(id);
  }
}
