import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BUCKET_REPOSITORY } from 'src/common/tokens/token';
import type { BucketInterface } from '../domain/bucket.interface';
import { AppException } from 'utils/errorClass';
import { MenuItemService } from 'src/menu-item/application/menu-item.service';
import { ParentService } from 'src/parent/application/parent.service';
import { StudentService } from 'src/student/application/student.service';

@Injectable()
export class BucketService {

    constructor(
        @Inject(BUCKET_REPOSITORY)
        private bucketRepository: BucketInterface,
        private menuItemService: MenuItemService,
        private parentServie: ParentService,
        private studentService: StudentService
    ) { }

    getBucketById(id: number) {
        return this.bucketRepository.getBucketById(id)
    }

    getMyBucket(userId: number) {

        try {
            const student = this.studentService.findStudentByUserId(userId)

            if (!student) {
                throw new AppException("USER_NOT_FOUND")
            }

            const bucket = this.bucketRepository.getBucketByStudentId(student.id)
            if (!bucket) {
                throw new AppException("BUCKET_NOT_FOUND")
            }

            return bucket

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    getBucketItemsByBucketId(bucketId: number) {
        return this.bucketRepository.getBucketItemsByBucketId(bucketId)
    }

    private getItemInBucketByItemId(itemId: number) {
        return this.bucketRepository.getItemInBucketByItemId(itemId)
    }

    private allergiesOverlap(studentAllergies: number[], menuItemIngredients: number[]): number[] {
        const overlapIds: number[] = []
        const set = new Set(studentAllergies);

        set.forEach((allergy: number) => {
            if (menuItemIngredients.includes(allergy)) {
                overlapIds.push(allergy)
            }
        })
        return overlapIds
    }

    addItemToBucket(menuItemId: number, quantity: number, bucketId: number) {

        try {
            const bucket = this.getBucketById(bucketId)
            if (!bucket) {
                throw new AppException("BUCKET_NOT_FOUND")
            }

            const menuItem = this.menuItemService.findById(menuItemId)
            if (!menuItem) {
                throw new AppException("ITEM_NOT_FOUND")
            }
            if (!menuItem.available) {
                throw new AppException("MENU_ITEM_NOT_AVAILABLE")
            }

            const student = this.studentService.findStudentById(bucket.studentId)
            if (!student) {
                throw new AppException("USER_NOT_FOUND")
            }
            //
            const allergensOverllap = this.allergiesOverlap(student.allergies, menuItem.ingredients)

            if (allergensOverllap.length > 0) {
                throw new AppException("ALLERGEN_PRESENT")
            }
            //
            const parent = this.parentServie.getParentById(student.parentId)
            if (!parent) {
                throw new AppException("PARENT_NOT_FOUND")
            }
            //
            const newAmount = menuItem.price * quantity;
            const newTotalAmoutn = bucket.totalPrice + newAmount

            if (newTotalAmoutn > parent.balance) {
                throw new AppException("INSUFFICIENT_BALANCE")
            }

            const newItem = this.bucketRepository.addItem(menuItem.id, menuItem.price, quantity, bucketId)
            console.log("new item to bucket", newItem)
            const updatedBucket = this.bucketRepository.updateTotalPrice(newAmount, bucket.id)
            if (!updatedBucket) {
                throw new AppException("PAYMETN_NOT_UPDATED")
            }

            //
            return newItem

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }

    }

    removeItemFromBucket(itemId: number, bucketId: number) {
        try {
            const bucket = this.getBucketById(bucketId)
            if (!bucket) {
                throw new AppException("BUCKET_NOT_FOUND")
            }
            const item = this.getItemInBucketByItemId(itemId)
            if (!item) {
                throw new AppException("ITEM_NOT_FOUND")
            }
            const newQuantity = item.quantity * -1
            const amoutnToDeduct = newQuantity * item.itemPrice
            const removedItem = this.bucketRepository.removeItem(itemId)
            if (!removedItem) {
                throw new AppException("ITEM_NOT_FOUND")
            }
            const updatedBucket = this.bucketRepository.updateTotalPrice(amoutnToDeduct, bucket.id)
            if (!updatedBucket) {
                throw new AppException("PAYMETN_NOT_UPDATED")
            }
        } catch (error: any) {
            throw new HttpException(error.message, error.status)

        }

    }


}
