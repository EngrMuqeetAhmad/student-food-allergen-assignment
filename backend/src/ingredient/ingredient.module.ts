import { Module } from '@nestjs/common';
import { IngredientController } from './presentation/ingredient.controller';
import { IngredientService } from './application/ingredient.service';
import { INGREDIENT_REPOSITORY } from 'src/common/tokens/token';
import { InMemortIngredientRepository } from './infrastructure/in-memory/ingredient.repository';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService,
    {
      provide: INGREDIENT_REPOSITORY,
      useClass: InMemortIngredientRepository
    }
  ],
  exports: [IngredientService]
})
export class IngredientModule { }
