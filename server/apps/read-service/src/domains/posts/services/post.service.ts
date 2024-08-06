import { User } from '@app/common/entities';
import { BaseFilter } from '@app/common/filter/base.filter';
import { PostRepository } from '@app/common/repositories/post.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getPosts(query: BaseFilter, author: User) {
    const { limit: take, skip } = query;
    const postTotal = await this.postRepository.count({
      where: {
        author: {
          id: author.id,
        },
      },
    });
    const posts = await this.postRepository.findMany({
      where: {
        author: {
          id: author.id,
        },
      },
      take: take,
      skip: skip,
      order: {
        created_at: 'DESC',
      },
      relations: ['images', 'collaborators'],
    });

    return {
      data: posts,
      total: postTotal.count,
    };
  }

  public async getPost(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['images', 'collaborators', 'postComments', 'author.profile'],
    });
    return post;
  }

  public async getPostsHome(query: BaseFilter) {
    const { limit: take, skip } = query;
    const postTotal = await this.postRepository.count({
      where: {},
    });
    const posts = await this.postRepository.findMany({
      take: take,
      skip: skip,
      order: {
        created_at: 'DESC',
      },
      relations: ['images', 'collaborators', 'author.profile.avatars'],
    });

    return {
      data: posts,
      total: postTotal.count,
    };
  }
}
