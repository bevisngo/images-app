import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';

describe('ConsumerController', () => {
  let consumerController: ConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [ConsumerService],
    }).compile();

    consumerController = app.get<ConsumerController>(ConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(consumerController.getHello()).toBe('Hello World!');
    });
  });
});
