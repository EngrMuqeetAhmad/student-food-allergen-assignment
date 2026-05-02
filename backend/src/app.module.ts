import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { BucketModule } from './bucket/bucket.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrderModule, IngredientModule, ParentModule, StudentModule, BucketModule, MenuItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
