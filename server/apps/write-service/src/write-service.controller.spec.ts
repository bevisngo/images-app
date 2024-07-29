import { Test, TestingModule } from '@nestjs/testing';
import { WriteServiceController } from './write-service.controller';
import { WriteServiceService } from './write-service.service';

describe('WriteServiceController', () => {
  let writeServiceController: WriteServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WriteServiceController],
      providers: [WriteServiceService],
    }).compile();

    writeServiceController = app.get<WriteServiceController>(WriteServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(writeServiceController.getHello()).toBe('Hello World!');
    });
  });
});
