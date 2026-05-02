import { useGetMenuItemsQuery } from "../../menuApi";
import { MenuListItem } from "./ListItem/ListItem";

export const MenuList = () => {
    const { data, isLoading, isError } = useGetMenuItemsQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong</p>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {data?.map((item) => (
                <MenuListItem key={item.id} {...item} />
            ))}
        </div>
    );
};