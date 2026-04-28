
import { Ingredients } from "src/repository/ingredient.repo";
import { Menu } from "src/repository/menu.repo";
import { Parents } from "src/repository/parent.repo";
import { Student } from "src/repository/student.repo";
import { Bucket } from "src/repository/bucket.repo";
import { Order } from "src/repository/order.repo";
import { Utils } from "src/repository/utils.repo";
import { IngredientsData } from "src/seed/ingredient.seed";
import { MenuData } from "src/seed/menu.seed";
import { ParentsData } from "src/seed/parent.seed";
import { StudentsData } from "src/seed/student.seed";
import { BucketsData } from "src/seed/bucket.seed";



export class DB {
    private static instance: null | DB = null;

    public ingredientsInstance: Ingredients = Ingredients.getInstance(IngredientsData);
    public menuInstance: Menu = Menu.getInstance(MenuData);
    public parentsInstance: Parents = Parents.getInstance(ParentsData);
    public studentInstance: Student = Student.getInstance(StudentsData);
    public bucketInstance: Bucket = Bucket.getInstance(BucketsData);
    public orderInstance: Order = Order.getInstance();
    public utilsInstance: Utils = Utils.getInstance();

    private constructor() { }

    public static getInstance(): DB {
        if (this.instance === null) {
            return new DB();
        }
        return this.instance;
    }
}
