import { Outlet } from "react-router";
import { Header } from "../header/header";
import { SideBar } from "../sidebar/sidebar";

export const BaseLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-text">

            <header className="h-[70px] w-full bg-card border-b border-border">
                <Header />
            </header>

            <div className="flex flex-1">

                <SideBar />

                <main className="flex-1 p-6 overflow-y-auto bg-background">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};