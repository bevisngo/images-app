import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MediaType {
  @IsString()
  mimetype: string;

  @IsString()
  filenames: string;

  @IsString()
  path: string;
}

export class CreatePostDto {
  @IsString()
  caption: string;

  @IsNotEmpty()
  @IsArray()
  images: string[];
}
