import { api } from "../../api/api";
import type { MenuItem } from "./types/menu.types";



export const menuApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getMenuItems: builder.query<MenuItem[], void>({
            query: () => ({
                url: "/menu-item/all",
                method: "GET",
            }),
        }),

        getMenuItemById: builder.query<MenuItem, number>({
            query: (id) => ({
                url: `/menu-item/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useGetMenuItemsQuery,
    useGetMenuItemByIdQuery,
} = menuApi;