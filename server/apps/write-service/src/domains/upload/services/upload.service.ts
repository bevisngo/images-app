import { S3Service } from '@app/common/aws/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { GetPresignedUrlDto } from '../dtos/upload.dto';

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) {}

  public async getPresignedUrls(payload: GetPresignedUrlDto) {
    const { files } = payload;
    return this.s3Service.getPresignedUrls(files);
  }
}
