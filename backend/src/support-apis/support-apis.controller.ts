import { Controller, Get, Post } from '@nestjs/common';
import { SupportApisService } from './support-apis.service';

@Controller('support-apis')
export class SupportApisController {

    constructor(private supportApisService: SupportApisService) {
    }

    @Get('/list-students')
    listStudents() {
        return this.supportApisService.getAllStudents()
    }

    @Get('/list-menu-items')
    listMenuItems() {
        return this.supportApisService.getAllMenuItems();
    }

}
