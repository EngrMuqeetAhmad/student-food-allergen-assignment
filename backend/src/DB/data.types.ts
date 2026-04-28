type IngredientType = {
    id: number;
    name: string;
}

type MenuItemType = {
    id: number;
    name: string;
    price: number;
    ingredients: number[] //it is an array of ingredient ids that are used in this menu item;
    available: boolean;
}


type ParentType = {
    id: number;
    balance: number;
    name: string;
    lock: boolean
}

type StudentType = {
    id: number;
    name: string;
    parentId: number;
    allergies: number[] //ids of ingredient the student is allergic to;
}

type BucketType = {
    id: number;
    studnetId: number;
    totalPrice: number;

}

type OrderItemType = {
    id: number;
    bucketId: number;
    menuItemId: number;
    quantity: number;
}



export type { IngredientType, MenuItemType, ParentType, StudentType, OrderItemType, BucketType }
