import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db';

@Injectable()
export class SupportApisService {


    getAllStudents() {
        return DB.getInstance().studentInstance.getAllStudents();
    }

    getAllMenuItems() {
        return DB.getInstance().menuInstance.getAllMenuItems();
    }

}
