import {
  IMAGE_QUEUE,
  IMAGE_RESOLUTION_JOB,
} from '@app/common/constants/queues.constant';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as sharp from 'sharp';
import * as path from 'path';
import { S3Service } from '@app/common/aws/s3/s3.service';
import { Image } from '@app/common/entities';

const sizes = [
  { type: 'MD', ratio: 0.75 },
  { type: 'SM', ratio: 0.5 },
  { type: 'XS', ratio: 0.25 },
];

@Processor(IMAGE_QUEUE)
export class ImageProcessingProcessor extends WorkerHost {
  constructor(private readonly s3Service: S3Service) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    switch (job.name) {
      case IMAGE_RESOLUTION_JOB:
        await this.handleResize(job);
        break;
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  }

  private async handleResize(job: Job<Image[]>): Promise<void> {
    const images = job.data;
    const paths = images.map((img) => img.path);
    try {
      const files = await this.s3Service.getFiles(paths);

      const resizedFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileBuffer = file.Body as Buffer;
        const originalPath = paths[i];
        const pathWithoutFilename = originalPath.substring(
          0,
          originalPath.lastIndexOf('/'),
        );

        const metadata = await sharp(fileBuffer).metadata();

        for (const size of sizes) {
          const resizedImageBuffer = await sharp(fileBuffer)
            .resize(
              Math.floor(metadata.width * size.ratio),
              Math.floor(metadata.height * size.ratio),
            )
            .png()
            .toBuffer();

          const outputPath = `${pathWithoutFilename}/${size.type}${file.ContentType.split('/')[1]}`;

          resizedFiles.push({
            path: outputPath,
            buffer: resizedImageBuffer,
            contentType: file.ContentType as string,
          });
        }
      }

      await this.s3Service.uploadFiles(resizedFiles);
    } catch (err) {
      console.error('Error get file from S3', err);
      return;
    }
  }
}
