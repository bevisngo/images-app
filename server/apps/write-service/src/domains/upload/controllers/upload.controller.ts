import { JwtAuthGuard } from '@app/common/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetPresignedUrlDto } from '../dtos/upload.dto';
import { UploadService } from '../services/upload.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from '@app/common/entities';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-urls')
  public async getPresignedUrls(
    @Body() getPresignedUrlDto: GetPresignedUrlDto,
    @CurrentUser() user: User,
  ) {
    return this.uploadService.getPresignedUrls(getPresignedUrlDto, user);
  }
}
