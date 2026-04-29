import { ParentInterface } from "src/parent/domain/parent.interface";
import { Parent } from "src/parent/domain/parent.model";
import { AppException } from "utils/errorClass";

export class InMemoryParentRepository implements ParentInterface {

    private parents: Parent[] = []

    getParentById(id: number): Parent | undefined {
        return this.parents.find((parent) => parent.id == id)
    }

    updateParentBalance(amountToBeDeduct: number, parentId: number): Parent {

        const parent = this.getParentById(parentId)
        if (!parent) {
            throw new AppException("PARENT_NOT_FOUND")
        }
        const newBalance = parent.balance - amountToBeDeduct

        this.parents = this.parents.map(item => {
            if (item.id == parent.id) {
                return {
                    ...item,
                    balance: newBalance >= 0 ? newBalance : 0
                }
            }
            return item
        })
        parent.balance = newBalance >= 0 ? newBalance : 0

        return parent

    }

}