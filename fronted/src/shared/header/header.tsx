import { useEffect } from "react";
import { useGetMyBucketQuery } from "../../features/bucket/bucketApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { onBucketFetch } from "../../features/bucket/bucketSlice";

export const Header = () => {
    const token = useAppSelector((state) => state.auth.token)
    const totalPrice = useAppSelector((state) => state.bucket.totalPrice)

    const useDispatch = useAppDispatch()
    const { data: bucket } = useGetMyBucketQuery(undefined, {
        skip: !token
    })

    useEffect(() => {
        if (bucket) {
            useDispatch(onBucketFetch({
                bucketId: bucket.id,
                studentId: bucket.studentId,
                totalPrice: bucket.totalPrice
            }))
        }
    }, [bucket]);

    return (
        <>
            <div className="flex flex-col w-full h-[70px] items-center justify-center" >

                Bucket Current PRice: {totalPrice}
            </div>
        </>
    )
}