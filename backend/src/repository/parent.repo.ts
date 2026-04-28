import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { ParentType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";

export class Parents {
    private static instance: null | Parents = null;

    private parents: ParentType[] = [];

    private constructor(parents?: ParentType[]) {
        this.parents = parents || [];
    }

    public static getInstance(parents?: ParentType[]): Parents {
        if (this.instance == null) {
            this.instance = new Parents(parents || []);
        }
        return this.instance;
    }

    public getParents(): ParentType[] {

        return this.parents

    }
    //get patrent by id, balance operations

    public getParentById(id: number): ParentType {
        try {
            const parent = this.parents.find((parent: ParentType) => parent.id == id);
            if (!parent) {
                throw new Error("PARENT_NOT_FOUND")
            }
            if (parent.lock) {
                throw new AppException("PARENT_ACCOUNT_LOCKED")
            }
            return parent
        } catch (error: any) {
            throw new HttpException(error.message, error.status)

        }
    }

    public lockParentAccount(id: number): ParentType {
        try {

            const parent = this.getParentById(id);

            this.parents = this.parents.map((parent: ParentType) => {
                if (parent.id == id) {
                    parent.lock = true;
                }
                return parent
            });
            parent.lock = true;
            return parent

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    public unLockParentAccount(id: number): ParentType {
        try {


            this.parents = this.parents.map((parent: ParentType) => {
                if (parent.id == id) {
                    parent.lock = false;
                }
                return parent
            });
            return this.getParentById(id)

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

}