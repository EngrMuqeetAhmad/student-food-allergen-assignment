// errors.ts
export const ERRORS = {
    MENU_ITEM_NOT_FOUND: {
        status: 400,
        message: "Menu item not found or unavailable",
    },
    MENU_ITEM_UNAVAILABLE: {
        status: 400,
        message: "Menu item unavailable",
    },

    INSUFFICIENT_BALANCE: {
        status: 400,
        message: "Insufficient wallet balance",
    },
    USER_NOT_FOUND: {
        status: 404,
        message: "User not found",
    },
    ORDER_NOT_FOUND: {
        status: 404,
        message: "Order not found",
    },
    BUCKET_NOT_FOUND: {
        status: 404,
        message: "Bucket not found",
    },
    BUCKET_EMPTY: {
        status: 400,
        message: "Bucket is empty",
    },
    MENU_ITEM_NOT_AVAILABLE: {
        status: 400,
        message: "Menu item not available",
    },
    ALLERGEN_PRESENT: {
        status: 400,
        message: "Allergen present in menu item",
    },
    INGREDIENT_NOT_FOUND: {
        status: 404,
        message: "Ingredient not found",
    },
    INVALID_PRICE: {
        status: 400,
        message: "Invalid price for menu item",
    },
    PARENT_NOT_FOUND: {
        status: 404,
        message: "Parent not found",
    },
    PARENT_ACCOUNT_LOCKED: {
        status: 403,
        message: "Parent account is locked for transaction",
    },
    INVALID_QUANTITY: {
        status: 400,
        message: "Invalid quantity for order item",
    },
    ORDER_NOT_CREATED: {
        status: 500,
        message: "Order not created",
    },
    INTERNAL_ERROR: {
        status: 500,
        message: "Something went wrong",
    }
} as const;