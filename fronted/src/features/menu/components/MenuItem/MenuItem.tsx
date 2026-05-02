import { useState } from "react";
import { useParams } from "react-router";
import { useGetMenuItemByIdQuery } from "../../menuApi";
import { useAppSelector } from "../../../../store/hooks";
import { useAddItemToBucketMutation } from "../../../bucket/bucketApi";
import { toast } from "react-toastify";

export const MenuItem = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useGetMenuItemByIdQuery(
        Number(id)
    );

    const bucketId = useAppSelector((state) => state.bucket.bucketId); // adjust if needed

    const [quantity, setQuantity] = useState(1);

    const [addToBucket, { isLoading: isAdding }] =
        useAddItemToBucketMutation();

    const handleAddToBucket = async () => {
        if (!bucketId) {
            console.error("No bucket found");
            return;
        }

        try {
            await addToBucket({
                menuItemId: data!.id,
                quantity,
                bucketId,
            }).unwrap();
            toast.success("Added to bucket")

            console.log("Added to bucket");
        } catch (err: any) {
            toast.error(err.data.message)
            console.error("Failed to add item", err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading item</p>;
    if (!data) return <p>No item found</p>;

    return (
        <div className="p-6 bg-card border border-border rounded-md max-w-md space-y-4">

            <h1 className="text-lg font-semibold text-text">
                {data.name}
            </h1>

            <p className="text-text-muted">
                Price: ${data.price}
            </p>

            <p className="text-text-muted">
                {data.available ? "Available" : "Out of stock"}
            </p>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 border border-border rounded-md"
                >
                    -
                </button>

                <span className="text-text">{quantity}</span>

                <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 border border-border rounded-md"
                >
                    +
                </button>
            </div>

            <button
                onClick={handleAddToBucket}
                disabled={!data.available || isAdding}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition disabled:opacity-50"
            >
                {isAdding ? "Adding..." : "Add to Bucket"}
            </button>

        </div>
    );
};