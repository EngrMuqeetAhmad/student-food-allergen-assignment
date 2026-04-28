import { HttpException } from "@nestjs/common";
import { IngredientType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";


export class Ingredients {
    private static instance: null | Ingredients = null;

    private ingredients: IngredientType[] = [];

    private constructor(ingredients?: IngredientType[]) {
        this.ingredients = ingredients || [];
    }

    public static getInstance(ingredients?: IngredientType[]): Ingredients {
        if (this.instance == null) {
            this.instance = new Ingredients(ingredients || []);
        }
        return this.instance;
    }

    public getIngredients(): IngredientType[] {

        return this.ingredients

    }

    public getIngredientById(id: number): IngredientType {
        try {
            const ingredient = this.ingredients.find((ingredient: IngredientType) => ingredient.id == id);
            if (!ingredient) {
                throw new AppException("INGREDIENT_NOT_FOUND")
            }
            return ingredient
        } catch (error: any) {
            throw new HttpException(error.message, error.status)

        }
    }
}