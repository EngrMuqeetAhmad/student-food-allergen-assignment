import { MenuItem } from "./menuItem.model";

export interface MenuItemInterface {


    findAll(): MenuItem[];

    findById(id: number): MenuItem | undefined;

    validateItem(id: number): boolean

}