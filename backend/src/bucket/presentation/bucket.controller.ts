import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BucketService } from '../application/bucket.service';
import { AddItemToBucketDTO, DeleteItemFromBucketDTO } from './dto/bucket.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/utils/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('bucket')
export class BucketController {

    constructor(private bucketService: BucketService) { }

    @Get('/mine')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    getMyBucket(@Req() req: any) {
        return this.bucketService.getMyBucket(req.user.id)
    }


    @Get('/items/:bucketId')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    getBucketItemsByBucketId(@Param('bucketId') bucketId: number) {
        return this.bucketService.getBucketItemsByBucketId(bucketId)
    }



    @Get(':id')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    getBucketById(@Param('id') id: number) {
        return this.bucketService.getBucketById(id)
    }


    @Post("/addItem")
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    addItemToBucket(@Body() addItemToBucketDTO: AddItemToBucketDTO) {
        return this.bucketService.addItemToBucket(addItemToBucketDTO.menuItemId, addItemToBucketDTO.quantity, addItemToBucketDTO.bucketId)

    }

    @Delete("/Item")
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    deleteItemFromBucket(@Body() deleteItemFromBucketDTO: DeleteItemFromBucketDTO) {
        return this.bucketService.removeItemFromBucket(deleteItemFromBucketDTO.itemId, deleteItemFromBucketDTO.bucketId)
    }

}
