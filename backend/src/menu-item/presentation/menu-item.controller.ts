import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MenuItemService } from '../application/menu-item.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('menu-item')
export class MenuItemController {

    constructor(private menuItemService: MenuItemService) { }

    @Get('all')
    @UseGuards(AuthGuard)
    findAll() {
        return this.menuItemService.findAll()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findById(@Param('id') id: number) {
        return this.menuItemService.findById(id)
    }

}
