import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PARENT_REPOSITORY } from 'src/common/tokens/token';
import type { ParentInterface } from '../domain/parent.interface';
import { AppException } from 'utils/errorClass';

@Injectable()
export class ParentService {

    constructor(
        @Inject(PARENT_REPOSITORY)
        private parentRepository: ParentInterface
    ) { }

    getParentById(id: number) {
        return this.parentRepository.getParentById(id)
    }

    updateParentBalance(amountDeduct: number, parentId: number) {
        try {
            if (amountDeduct <= 0) {
                throw new AppException("INVALID_PRICE")
            }

            const updatedParent = this.parentRepository.updateParentBalance(amountDeduct, parentId)
            return updatedParent

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }



    }

}
