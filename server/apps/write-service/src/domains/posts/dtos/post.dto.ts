import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

export class MediaType {
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  alt: string;

  // @IsArray()
  // @IsOptional()
  // hashtags: string[];
}

export class CreatePostDto {
  @IsString()
  caption: string;

  @IsNotEmpty()
  @IsArray()
  @Validate(IsArray({ each: true }))
  @Type(() => MediaType)
  images: MediaType[];
}
