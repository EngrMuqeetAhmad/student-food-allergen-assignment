import { OrderList } from "../features/order/components/OrderList/OrderList"

export const OrderPage = () => {
    return (
        <>
            <div className="flex flex-col w-full items-start justify-start" >
                <OrderList />
            </div>

        </>
    )
}