import { Controller, Get, Param } from '@nestjs/common';
import { IngredientService } from '../application/ingredient.service';

@Controller('ingredient')
export class IngredientController {

    constructor(private ingredientService: IngredientService) { }
    @Get('all')
    findAll() {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.ingredientService.findById(id);
    }
}
