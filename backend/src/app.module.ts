import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { SupportApisModule } from './support-apis/support-apis.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { BucketModule } from './bucket/bucket.module';
import { MenuItemModule } from './menu-item/menu-item.module';

@Module({
  imports: [OrderModule, SupportApisModule, IngredientModule, MenuModule, ParentModule, StudentModule, BucketModule, MenuItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
