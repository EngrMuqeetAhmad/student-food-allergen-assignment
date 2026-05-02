import { useState } from "react";
import type { BucketItem as BucketItemType } from "../../types/bucket.types";
import { useDeleteItemFromBucketMutation } from "../../bucketApi";
import { ConfirmModal } from "../../../../components/modal/ConfirmationModal";


export const BucketItem = (props: BucketItemType) => {
    const [showModal, setShowModal] = useState(false);

    const [deleteItem, { isLoading }] =
        useDeleteItemFromBucketMutation();

    const handleDelete = async () => {
        try {
            await deleteItem({
                itemId: props.id,
                bucketId: props.bucketId,
            }).unwrap();

            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center p-3 border border-border bg-card rounded-md">

                <div>
                    <p className="text-text font-medium">
                        Item ID: {props.menuItemId}
                    </p>

                    <p className="text-text-muted text-sm">
                        Quantity: {props.quantity}
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <div className="text-text font-semibold">
                        ${props.itemPrice}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="text-red-500 hover:text-red-600"
                    >
                        ✕
                    </button>

                </div>
            </div>

            {showModal && (
                <ConfirmModal
                    title="Remove Item"
                    message="Are you sure you want to remove this item from your bucket?"
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    loading={isLoading}
                />
            )}
        </>
    );
};