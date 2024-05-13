import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import { handleError } from "../../../utils";
import Apis from "../../../api";

const initialState: ProductState = {
     items: undefined,
     itemCount: 0,
     loading: false
}

export const fetchSearchProducts = createAsyncThunk('fetchProducts', async (payload: any, { dispatch }) => {
     try {
          const response = await Apis.fetchProducts(payload);
          return {data:response.data.data,count:response.data.data.length};

     } catch (error: any) {
          handleError(error?.response?.status, error?.response?.data?.message, dispatch);
          return { data: [], count: 0 };
     }
})

const productSlice = createSlice({
     name: 'searchProducts',
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
          builder.addCase(fetchSearchProducts.pending,(state)=>{
               state.loading=true;
          })
          .addCase(fetchSearchProducts.fulfilled,(state,action:any)=>{
               state.items = action.payload.data;
               state.itemCount = action.payload.count;
               state.loading = false;
          })
          .addCase(fetchSearchProducts.rejected,(state,action:any)=>{
               state.items = action.data;
               state.itemCount = action.count;
               state.loading = false;
          })
     }
})

export default productSlice.reducer;