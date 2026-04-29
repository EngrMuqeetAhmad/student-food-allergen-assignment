import { Controller, Get, Param } from '@nestjs/common';
import { ParentService } from '../application/parent.service';

@Controller('parent')
export class ParentController {

    constructor(private parentService: ParentService) { }

    @Get(':id')
    findParentById(@Param('id') id: number) {
        return this.parentService.getParentById(id)
    }

}
