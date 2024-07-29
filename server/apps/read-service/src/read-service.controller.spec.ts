import { Test, TestingModule } from '@nestjs/testing';
import { ReadServiceController } from './read-service.controller';
import { ReadServiceService } from './read-service.service';

describe('ReadServiceController', () => {
  let readServiceController: ReadServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadServiceController],
      providers: [ReadServiceService],
    }).compile();

    readServiceController = app.get<ReadServiceController>(ReadServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(readServiceController.getHello()).toBe('Hello World!');
    });
  });
});
