import { JwtAuthGuard } from '@app/common/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { GetPresignedUrlDto } from '../dtos/upload.dto';
import { UploadService } from '../services/upload.service';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-urls')
  public async getPresignedUrl(@Body() getPresignedUrlDto: GetPresignedUrlDto) {
    return this.uploadService.getPresignedUrls(getPresignedUrlDto);
  }
}
