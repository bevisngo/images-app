import { Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3ClientService } from './s3.client.service';

@Global()
@Module({
  providers: [S3Service, S3ClientService],
  exports: [S3Service, S3ClientService],
})
export class S3Module {}
