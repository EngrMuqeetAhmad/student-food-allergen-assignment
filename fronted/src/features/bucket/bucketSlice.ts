import { createSlice } from "@reduxjs/toolkit";
import type { BucketState } from "./types/bucket.types";

const initialState: BucketState = {
    bucketId: null,
    totalPrice: null,
    studentId: null
}

const bucketSlice = createSlice({
    name: "bucket",
    initialState,
    reducers: {
        onBucketFetch: (state, action) => {
            state.bucketId = action.payload.bucketId;
            state.totalPrice = action.payload.totalPrice;
            state.studentId = action.payload.studentId;

        },
    }
})

export const { onBucketFetch } = bucketSlice.actions

export const bucketReducer = bucketSlice.reducer