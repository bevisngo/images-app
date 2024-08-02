import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;
  private readonly postImagesBucketName = '';
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      endpoint: configService.get('S3_HOST'),
      s3ForcePathStyle: true,
      accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
      region: configService.get('S3_REGION'),
    });
    this.postImagesBucketName = configService.get('S3_POST_IMAGES_BUCKET');
  }

  async createBucket(bucketName: string): Promise<void> {
    const params = {
      Bucket: bucketName,
    };
    await this.s3.createBucket(params).promise();
    console.log(`Bucket "${bucketName}" created successfully.`);
  }

  async uploadFile(file: Express.Multer.File): Promise<void> {
    const params = {
      Bucket: this.postImagesBucketName,
      Key: `${uuidv4()}-${file.originalname}`, // Tạo tên file duy nhất bằng UUID
      Body: file.buffer,
    };
    await this.s3.upload(params).promise();
    console.log(
      `File "${file.originalname}" uploaded successfully to bucket "${this.postImagesBucketName}".`,
    );
  }

  async listObjects(): Promise<AWS.S3.ObjectList> {
    const params = {
      Bucket: this.postImagesBucketName,
    };
    const data = await this.s3.listObjectsV2(params).promise();
    console.log(
      `Objects in bucket "${this.postImagesBucketName}":`,
      data.Contents,
    );
    return data.Contents;
  }

  async getPresignedUrls(
    files: { name: string; mimeType: string }[],
  ): Promise<string[]> {
    const urls = await Promise.all(
      files.map(async (file) => {
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const params = {
          Bucket: this.postImagesBucketName,
          Key: uniqueFileName,
          Expires: 60,
          ContentType: file.mimeType,
        };
        const url = await this.s3.getSignedUrlPromise('putObject', params);
        return url;
      }),
    );
    return urls;
  }
}
