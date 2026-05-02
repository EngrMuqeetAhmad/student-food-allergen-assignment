import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ParentService } from '../application/parent.service';
import { ROLE } from 'src/utils/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('parent')
export class ParentController {

    constructor(private parentService: ParentService) { }

    @Get(':id')
    @Roles(ROLE.STUDENT, ROLE.PARENT)
    @UseGuards(AuthGuard, RolesGuard)
    findParentById(@Param('id') id: number) {
        return this.parentService.getParentById(id)
    }

}
