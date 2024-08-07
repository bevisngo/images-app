import { Controller } from '@nestjs/common';
import { imageProcessingService } from '../services/image-processing.service';

@Controller('image-processing')
export class ImageProcessingController {
  constructor(
    private readonly imageProcessingService: imageProcessingService,
  ) {}
}
