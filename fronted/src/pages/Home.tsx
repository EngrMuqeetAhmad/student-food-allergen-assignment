// src/pages/Home.tsx

import { useEffect, useState } from "react";
import SupportApisService from "../service/support-api/support-api.service";
import OrderService from "../service/order/order.service";
import { toast } from "react-toastify";

export default function Home({
    studentId,
    setStudentId,
}: {
    studentId: number | null;
    setStudentId: (id: number) => void;
}) {
    const [students, setStudents] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const s = await SupportApisService.listStudents();
            const m = await SupportApisService.listMenuItems();

            setStudents(s);
            setMenuItems(m);
        };

        fetchData();
    }, []);

    const handleAdd = async (menuItemId: number) => {
        if (!studentId) {
            toast.error("Select a student");
            return
        }

        try {
            await OrderService.addItem({
                menuItemId,
                quantity: 1,
                studentId,
            });
        } catch (err: any) {
            console.error(err);
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Select Student</h2>
                <select
                    className="border p-2 rounded w-full"
                    onChange={(e) => setStudentId(Number(e.target.value))}
                >
                    <option value="">-- Select --</option>
                    {students.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Menu</h2>

                <div className="space-y-3">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-3 rounded"
                        >
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    ${item.price}
                                </p>
                            </div>

                            <button
                                className="px-3 py-1 bg-black text-white rounded disabled:bg-gray-300"
                                disabled={!item.available}
                                onClick={() => handleAdd(item.id)}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}