import { Module } from '@nestjs/common';
import { SupportApisController } from './support-apis.controller';
import { SupportApisService } from './support-apis.service';

@Module({
  controllers: [SupportApisController],
  providers: [SupportApisService]
})
export class SupportApisModule {}
