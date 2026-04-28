import { Test, TestingModule } from '@nestjs/testing';
import { SupportApisService } from './support-apis.service';

describe('SupportApisService', () => {
  let service: SupportApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportApisService],
    }).compile();

    service = module.get<SupportApisService>(SupportApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
