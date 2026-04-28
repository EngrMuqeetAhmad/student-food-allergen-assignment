
import { useEffect, useState } from "react";
import OrderService from "../service/order/order.service";
import { toast } from "react-toastify";
export default function Bucket({
    studentId,
}: {
    studentId: number | null;
}) {
    const [items, setItems] = useState<any[]>([]);

    const fetchItems = async () => {
        if (!studentId) return;
        const data = await OrderService.listOrderItems(studentId);
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, [studentId]);

    const handleRemove = async (menuItemId: number) => {
        if (!studentId) return;

        await OrderService.removeItem({
            menuItemId,
            studentId,
        });

        setItems((prev) =>
            prev.filter((item) => item.menuItemId !== menuItemId)
        );
    };

    const handleComplete = async () => {
        if (!studentId) return;

        await OrderService.completeOrder({ studentId });
        setItems([]);
        toast.success("Order completed");
    };

    if (!studentId) {
        return <p className="text-gray-500">Select a student first</p>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Bucket</h2>

            {items.length === 0 && (
                <p className="text-gray-500">No items</p>
            )}

            {items.map((item) => (
                <div
                    key={item.menuItemId}
                    className="flex justify-between items-center border p-3 rounded"
                >
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                        </p>
                    </div>

                    <button
                        className="text-red-500"
                        onClick={() => handleRemove(item.menuItemId)}
                    >
                        ✕
                    </button>
                </div>
            ))}

            {items.length > 0 && (
                <button
                    className="w-full py-2 bg-green-600 text-white rounded"
                    onClick={handleComplete}
                >
                    Complete Order
                </button>
            )}
        </div>
    );
}