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
  }

  async uploadFile(file: Express.Multer.File): Promise<void> {
    const params = {
      Bucket: this.postImagesBucketName,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
    };
    await this.s3.upload(params).promise();
  }

  async listObjects(): Promise<AWS.S3.ObjectList> {
    const params = {
      Bucket: this.postImagesBucketName,
    };
    const data = await this.s3.listObjectsV2(params).promise();

    return data.Contents;
  }
  async getFile(path: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.postImagesBucketName,
      Key: path,
    };
    const data = await this.s3.getObject(params).promise();
    return data;
  }

  async getFiles(paths: string[]): Promise<AWS.S3.GetObjectOutput[]> {
    const files = await Promise.all(
      paths.map(async (path) => {
        const params = {
          Bucket: this.postImagesBucketName,
          Key: path,
        };
        return await this.s3.getObject(params).promise();
      }),
    );
    return files;
  }

  async uploadFiles(
    files: { path: string; buffer: Buffer; contentType: string }[],
  ): Promise<void> {
    await Promise.all(
      files.map(async (file) => {
        const params = {
          Bucket: this.postImagesBucketName,
          Key: file.path,
          Body: file.buffer,
          ContentType: file.contentType,
        };
        await this.s3.upload(params).promise();
      }),
    );
  }

  async uploadResizedImage(
    path: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<void> {
    const params = {
      Bucket: this.postImagesBucketName,
      Key: path,
      Body: buffer,
      ContentType: contentType,
    };
    await this.s3.upload(params).promise();
  }
}
