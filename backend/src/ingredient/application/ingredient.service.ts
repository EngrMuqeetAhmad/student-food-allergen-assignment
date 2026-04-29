import { Inject, Injectable } from '@nestjs/common';
import { INGREDIENT_REPOSITORY } from 'src/common/tokens/token';
import type { IngredientInterface } from '../domain/ingredient.interface';

@Injectable()
export class IngredientService {

    constructor(
        @Inject(INGREDIENT_REPOSITORY)
        private ingredientRepository: IngredientInterface


    ) {

    }

    findAll() {
        return this.ingredientRepository.findAll();
    }

    findById(id: number) {
        return this.ingredientRepository.findById(id);
    }

}
