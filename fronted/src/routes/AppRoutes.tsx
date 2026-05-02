import { BrowserRouter, Route, Routes } from "react-router"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { BaseLayout } from "../shared/layout/layout"
import { LoginPage } from "../pages/Login"
import { MenuPage } from "../pages/Menu/Menu"
import { MenuItemDetail } from "../pages/Menu/MenuItemDetail"
import { BucketPage } from "../pages/Bucket"
import { OrderPage } from "../pages/Order"


export const AppRouter = () => {


    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<LoginPage />} />
                    <Route

                        element={<ProtectedRoutes>


                            <BaseLayout />
                        </ProtectedRoutes>}
                    >
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/:id" element={<MenuItemDetail />} />

                        <Route path="/bucket" element={<BucketPage />} />
                        <Route path="/order" element={<OrderPage />} />


                    </Route>

                    <Route path="*" element={<>Not found</>} />


                </Routes>

            </BrowserRouter>

        </>
    )

}