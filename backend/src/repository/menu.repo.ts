import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { MenuItemType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";

export class Menu {
    private static instance: null | Menu = null;

    private menu: MenuItemType[] = [];

    private constructor(menuItems?: MenuItemType[]) {
        this.menu = menuItems || [];
        console.log("Menu instance created with items: ", this.menu)
    }

    public static getInstance(menuItems?: MenuItemType[]): Menu {
        console.log("Getting menu instance", menuItems)
        if (this.instance == null) {
            this.instance = new Menu(menuItems || []);

        }
        return this.instance;
    }

    public getMenu(): MenuItemType[] {

        return this.menu

    }

    public getMenuItemById(id: number): MenuItemType {
        console.log("Getting menu item by id: ", id)
        try {
            console.log("Current menu items: ", this.menu)
            const menuItem = this.menu.find((menuItem: MenuItemType) => menuItem.id == id);
            console.log("Found menu item: ", menuItem)
            if (!menuItem) {
                throw new AppException("MENU_ITEM_NOT_FOUND")
            }
            if (!menuItem.available) {
                throw new AppException("MENU_ITEM_NOT_AVAILABLE")
            }
            return menuItem
        } catch (error: any) {
            console.log(error)
            throw new HttpException(error.message, error.status)

        }
    }

    public getAllMenuItems(): MenuItemType[] {
        return this.menu;
    }

}