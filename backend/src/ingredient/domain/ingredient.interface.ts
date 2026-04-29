import { Ingredient } from "./ingredient.model";

export interface IngredientInterface {

    findAll(): Ingredient[];

    findById(id: number): Ingredient | undefined;

}