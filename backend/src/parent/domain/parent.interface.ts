import { Parent } from "./parent.model";

export interface ParentInterface {

    getParentById(id: number): Parent | undefined

    updateParentBalance(amountToBeDeduct: number, parentId: number): Parent

}