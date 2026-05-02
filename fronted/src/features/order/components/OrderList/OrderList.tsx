import { toast } from "react-toastify";
import { useAppSelector } from "../../../../store/hooks";
import { useCompleteOrderMutation, useGetOrdersByStudentQuery } from "../../orderApi";
import { sortOrdersByIdAsc } from "../../utils/utils";
import { useNavigate } from "react-router";
import { routes } from "../../../../routes/routes";

export const OrderList = () => {
    const navigate = useNavigate()
    const studentId = useAppSelector((state) => state.bucket.studentId);

    const { data: orders, isLoading, isError } =
        useGetOrdersByStudentQuery(studentId!, {
            skip: !studentId,
        });

    const [completeOrder, { isLoading: isCompleting }] =
        useCompleteOrderMutation();

    if (!studentId) return <p>Please login</p>;
    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error loading orders</p>;

    const sortedOrders = sortOrdersByIdAsc(orders);

    const activeOrder = sortOrdersByIdAsc(orders).find(
        (o) => o.status === "PENDING"
    );

    const handleComplete = async (orderId: number) => {
        try {
            await completeOrder({
                orderId,
                studentId,
            }).unwrap();
            toast.success("payment Deducted successfully, order complete")
            navigate(routes.menu)
        } catch (err: any) {
            toast.error(err.data.message)
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-3 p-4">

            <h1 className="text-lg font-semibold text-text">
                Orders
            </h1>

            {sortedOrders.map((order) => {
                const isActive = order.id === activeOrder?.id;

                return (
                    <div
                        key={order.id}
                        className={`
              p-4 border rounded-md flex justify-between items-center
              ${isActive ? "border-primary bg-primary/5" : "border-border opacity-70"}
            `}
                    >

                        <div>
                            <p className="text-text font-medium">
                                Order #{order.id}
                            </p>

                            <p className="text-text-muted text-sm">
                                Status: {order.status}
                            </p>

                            <p className="text-text-muted text-sm">
                                Total: ${order.totalPrice}
                            </p>
                        </div>

                        <div>

                            {isActive && order.status === "PENDING" ? (
                                <button
                                    onClick={() => handleComplete(order.id)}
                                    disabled={isCompleting}
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                                >
                                    Complete Order
                                </button>
                            ) : (
                                <span className="text-text-muted text-sm">
                                    Unavailable
                                </span>
                            )}

                        </div>

                    </div>
                );
            })}

        </div>
    );
};