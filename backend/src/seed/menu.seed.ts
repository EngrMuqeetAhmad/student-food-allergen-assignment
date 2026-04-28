import { MenuItemType } from "src/DB/data.types";

export const MenuData: MenuItemType[] = [
    {
        id: 1,
        name: "Peanut Butter Sandwich",
        price: 5,
        ingredients: [1, 3],
        available: true
    },
    {
        id: 2,
        name: "Grilled Cheese Sandwich",
        price: 4,
        ingredients: [2, 3],
        available: true
    },
    {
        id: 3,
        name: "Veggie Burger",
        price: 7,
        ingredients: [3, 4],
        available: true
    },
    {
        id: 4,
        name: "Chicken Salad",
        price: 6,
        ingredients: [5],
        available: true
    },
    {
        id: 5,
        name: "Fruit Salad",
        price: 4,
        ingredients: [],
        available: true
    }
]
