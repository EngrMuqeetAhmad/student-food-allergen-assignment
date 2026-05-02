import { useNavigate } from "react-router";
import type { MenuItem } from "../../../types/menu.types";
import { routes } from "../../../../../routes/routes";

export const MenuListItem = (props: MenuItem) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`${routes.menu}/${props.id}`)}
            className="p-4 bg-card border border-border rounded-md cursor-pointer hover:shadow-sm transition"
        >
            <h2 className="text-text font-medium">{props.name}</h2>

            <p className="text-text-muted text-sm">
                ${props.price}
            </p>

            <p className="text-xs mt-1">
                {props.available ? "Available" : "Unavailable"}
            </p>
        </div>
    );
};