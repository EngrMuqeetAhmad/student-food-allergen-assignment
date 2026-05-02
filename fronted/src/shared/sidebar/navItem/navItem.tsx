import { useLocation, useNavigate } from "react-router";
import type { NavItemType } from "./navItem.types";

export const NavItem = ({ name, path }: NavItemType) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <div
            onClick={() => navigate(path)}
            className={`
        px-3 py-2 rounded-md cursor-pointer text-sm
        transition-all duration-200

        ${isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-text-muted hover:bg-background hover:text-text"
                }
      `}
        >
            {name}
        </div>
    );
};