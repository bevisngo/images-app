import { S3Service } from '@app/common/aws/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { GetPresignedUrlDto } from '../dtos/upload.dto';
import { User } from '@app/common/entities';
import { S3ClientService } from '@app/common/aws/s3/s3.client.service';

@Injectable()
export class UploadService {
  constructor(private readonly s3ClientService: S3ClientService) {}

  public async getPresignedUrls(
    payload: GetPresignedUrlDto,
    user: User,
  ): Promise<any> {
    const { files } = payload;
    const { type = 'post' } = payload;
    return this.s3ClientService.getPresignedUrls(files, user, type);
  }
}
