import { MenuItemInterface } from "src/menu-item/domain/menuItem.interface";
import { MenuItem } from "src/menu-item/domain/menuItem.model";
import { MenuData } from "src/seed/menu.seed";
import { AppException } from "utils/errorClass";

export class InMemoryMenuItemRepository implements MenuItemInterface {

    private menuItems: MenuItem[] = [];

    constructor() {

        this.menuItems = MenuData
    }

    findAll(): MenuItem[] {
        return this.menuItems;
    }

    findById(id: number): MenuItem | undefined {
        return this.menuItems.find(menuItem => menuItem.id == id);
    }

    validateItem(id: number): boolean {
        const item = this.findById(id)
        if (!item) {
            throw new AppException("ITEM_NOT_FOUND")
        }
        if (!item.available) {
            return false
        }
        return true
    }


}
