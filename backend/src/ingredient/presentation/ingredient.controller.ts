import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IngredientService } from '../application/ingredient.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/utils/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('ingredient')
export class IngredientController {

    constructor(private ingredientService: IngredientService) { }
    @Get('all')
    @Roles(ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    findAll() {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    @Roles(ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    findById(@Param('id') id: number) {
        return this.ingredientService.findById(id);
    }
}
