import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { SupportApisModule } from './support-apis/support-apis.module';

@Module({
  imports: [OrderModule, SupportApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
