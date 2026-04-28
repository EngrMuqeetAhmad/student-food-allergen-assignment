import { Test, TestingModule } from '@nestjs/testing';
import { SupportApisController } from './support-apis.controller';

describe('SupportApisController', () => {
  let controller: SupportApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportApisController],
    }).compile();

    controller = module.get<SupportApisController>(SupportApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
