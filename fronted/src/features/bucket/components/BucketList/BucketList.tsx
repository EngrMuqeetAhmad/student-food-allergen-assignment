import { useAppSelector } from "../../../../store/hooks";
import { useGetBucketItemsQuery } from "../../bucketApi";
import { BucketItem } from "../BucketItem/BucketItem";


export const BucketList = () => {
    const bucketId = useAppSelector(
        (state) => state.bucket.bucketId
    );
    console.log("bucker id", bucketId)
    const { data, isLoading, isError } =
        useGetBucketItemsQuery(bucketId!, {
            skip: !bucketId,
        });

        
    if (!bucketId) return <p>No bucket found</p>;
    if (isLoading) return <p>Loading bucket...</p>;
    if (isError) return <p>Error loading bucket</p>;

    return (
        <div className="flex flex-col gap-3 p-4">
            {
                data?.length == 0 && <p>No items in the bucket</p>
            }
            {data && data.length > 0 && data?.map((item) => (
                <BucketItem key={item.id} {...item} />
            ))}
        </div>
    );
};