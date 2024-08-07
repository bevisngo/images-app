import { User } from '@app/common/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

interface GetPresignedUrl {
  filename: string;
  mimeType: string;
}

interface GetPresignedUrlResponse {
  filename: string;
  mimeType: string;
  path: string;
  url: string;
}

@Injectable()
export class S3ClientService {
  private readonly s3: AWS.S3;
  private readonly postImagesBucketName = '';
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      endpoint: configService.get('S3_CLIENT_HOST'),
      s3ForcePathStyle: true,
      accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
      region: configService.get('S3_REGION'),
    });
    this.postImagesBucketName = configService.get('S3_POST_IMAGES_BUCKET');
  }

  async getPresignedUrls(
    files: GetPresignedUrl[],
    user: User,
    type: string,
  ): Promise<GetPresignedUrlResponse[]> {
    const urls = await Promise.all(
      files.map(async (file) => {
        const path =
          user.id + '/' + type + '/' + uuidv4() + '/' + file.filename;
        const params = {
          Bucket: this.postImagesBucketName,
          Key: path,
          Expires: 60,
          ContentType: file.mimeType,
        };
        const url = await this.s3.getSignedUrlPromise('putObject', params);
        const signedUrl = `${url}&response-content-type=${encodeURIComponent(file.mimeType)}`;
        return {
          filename: file.filename,
          mimeType: file.mimeType,
          path,
          url: signedUrl,
        };
      }),
    );
    return urls;
  }
}
