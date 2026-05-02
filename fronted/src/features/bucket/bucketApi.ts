import { api } from "../../api/api";
import { onBucketFetch } from "./bucketSlice";
import type { Bucket, BucketItem } from "./types/bucket.types";

export const bucketApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getMyBucket: builder.query<Bucket, void>({
      query: () => "/bucket/mine",
      providesTags: ['Bucket'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(onBucketFetch({
          bucketId: data.id,
          totalPrice: data.totalPrice,
          studentId: data.studentId
        }));
      },
    }),

    getBucketItems: builder.query<BucketItem[], number>({
      query: (bucketId) => `/bucket/items/${bucketId}`,
      providesTags: ['BucketItem'],

    }),

    addItemToBucket: builder.mutation<
      void,
      { menuItemId: number; quantity: number; bucketId: number }
    >({
      query: (body) => ({
        url: "/bucket/addItem",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Bucket', 'BucketItem'],

    }),

    deleteItemFromBucket: builder.mutation<
      void,
      { itemId: number; bucketId: number }
    >({
      query: (body) => ({
        url: "/bucket/Item",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ['Bucket', 'BucketItem'],

    }),

  }),
});

export const {
  useGetMyBucketQuery,
  useGetBucketItemsQuery,
  useAddItemToBucketMutation,
  useDeleteItemFromBucketMutation,
} = bucketApi;