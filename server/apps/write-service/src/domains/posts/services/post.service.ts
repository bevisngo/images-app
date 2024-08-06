import { User } from '@app/common/entities';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/post.dto';
import { PostRepository } from '@app/common/repositories/post.repository';
import { ImageRepository } from '@app/common/repositories/image.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly imageRepository: ImageRepository,
  ) {}

  public async createPost(user: User, createPostDto: CreatePostDto) {
    const postPayload = {
      ...createPostDto,
      author: user,
    };

    const post = await this.postRepository.create(postPayload);

    const imagesPayload = createPostDto.images.map((image) => {
      return {
        ...image,
        post: post,
      };
    });

    await this.imageRepository.createMany(imagesPayload);
    return post;
  }
}
