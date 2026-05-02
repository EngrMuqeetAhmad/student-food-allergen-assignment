import { toast } from "react-toastify";
import { BucketList } from "../features/bucket/components/BucketList/BucketList";
import { useCreateOrderMutation } from "../features/order/orderApi";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";
import { routes } from "../routes/routes";

export const BucketPage = () => {
    console.log("bucket page");

    const navigate = useNavigate();

    const bucketId = useAppSelector(
        (state) => state.bucket.bucketId
    );

    const studentId = useAppSelector(
        (state) => state.bucket.studentId
    );

    const [createOrder, { isLoading }] =
        useCreateOrderMutation();

    const handlePlaceOrder = async () => {
        if (!bucketId || !studentId) return;

        try {
            const res = await createOrder({
                bucketId,
                studentId,
            }).unwrap();

            console.log("Order created:", res);

            navigate(routes.order);

            toast.success("order created success, do the payment now")

        } catch (err: any) {

            toast.error(err.data.message)
        }
    };

    return (
        <div className="flex flex-col w-full gap-4 p-4">

            <BucketList />

            <button
                onClick={handlePlaceOrder}
                disabled={!bucketId || isLoading}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition disabled:opacity-50"
            >
                {isLoading ? "Placing Order..." : "Place Order"}
            </button>

        </div>
    );
};