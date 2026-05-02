import { NavItem } from "./navItem/navItem";
import { navItems } from "./navItem/navItems";

export const SideBar = () => {
    return (
        <aside className="w-64 min-h-full bg-card border-r border-border flex flex-col">

            <div className="h-[70px] flex items-center px-4 border-b border-border">
                <h1 className="text-lg font-semibold text-text">
                    Food
                </h1>
            </div>

            <nav className="flex flex-col gap-1 p-3">
                {navItems.map(({ name, path }) => (
                    <NavItem key={path} name={name} path={path} />
                ))}
            </nav>

        </aside>
    );
};