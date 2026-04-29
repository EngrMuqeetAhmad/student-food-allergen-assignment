import { Inject, Injectable } from '@nestjs/common';
import { MENU_ITEM_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryMenuItemRepository } from '../infrastructure/in-memory/menuItem.repository';
import type { MenuItemInterface } from '../domain/menuItem.interface';

@Injectable()
export class MenuItemService {

    constructor(
        @Inject(MENU_ITEM_REPOSITORY)
        private menuItemRepository: MenuItemInterface
    ) {

    }

    findAll() {
        return this.menuItemRepository.findAll()
    }

    findById(id: number) {
        return this.menuItemRepository.findById(id)
    }

}

