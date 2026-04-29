import { Module } from '@nestjs/common';
import { MenuItemController } from './presentation/menu-item.controller';
import { MenuItemService } from './application/menu-item.service';
import { MENU_ITEM_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryMenuItemRepository } from './infrastructure/in-memory/menuItem.repository';

@Module({
  controllers: [MenuItemController],
  providers: [MenuItemService, {
    provide: MENU_ITEM_REPOSITORY,
    useClass: InMemoryMenuItemRepository
  }]
})
export class MenuItemModule { }
