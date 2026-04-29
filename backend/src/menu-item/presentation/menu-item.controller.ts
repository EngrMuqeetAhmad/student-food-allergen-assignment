import { Controller, Get, Param } from '@nestjs/common';
import { MenuItemService } from '../application/menu-item.service';

@Controller('menu-item')
export class MenuItemController {

    constructor(private menuItemService: MenuItemService) { }

    @Get('all')
    findAll() {
        return this.menuItemService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.menuItemService.findById(id)
    }

}
