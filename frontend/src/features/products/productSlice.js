import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import baseApi from "../../services/baseApi"


const initialState = {
    products : [],
    product: null,
    isLoading: false,
    error:null,
    notify:null,
}

//GetAll
export const fetchProducts = createAsyncThunk('products/fetchProduct', async () =>{
    const response = await baseApi.get('/product');
    return response.data;
})
//fetchById
export const fetchProductById = createAsyncThunk("products/fetchProductById", async (productId) =>{
    const response = await baseApi.get(`/product/${productId}`);
    //console.log("fetchById: ", response);
    return response.data
})
//update
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ productId, updatedProduct }, thunkAPI) => {
      try {
        if (!productId || !updatedProduct) {
          return thunkAPI.rejectWithValue("Product ID or updated product data is missing!");
        }
        await baseApi.put(`/product/${productId}`, updatedProduct);
        //console.log("ressss", response.data)
        //return response.data;
      } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred while updating the product.");
      }
    }
  );

//Add
export const addProduct = createAsyncThunk("products/addProduct", async ({ product }, thunkAPI) => {
try {
    // Sending the POST request to add the product
    const response = await baseApi.post("/product", product);
    
    
    // If successful, return the product data
    return response.data;
} catch (error) {
    console.log("add prodcut error",error)
    // In case of an error, handle the error and return a rejected action
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred while adding the product.");
}
});

//delete
export const deleteProduct = createAsyncThunk("products/deleteProduct", async(productId) =>{
    const response = await baseApi.delete(`/product/${productId}`)
    console.log(response);
    
})
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchProducts.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) =>{
            state.isLoading = false
            state.error = action.error.message
        })
        .addCase(fetchProductById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;

            // Optionally, you can also update the products list if needed
            // state.products = state.products.map((prod) =>
            //     prod.id === action.payload.id ? action.payload : prod
            // );
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(deleteProduct.pending, (state, action) =>{
            state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.notify = action.payload
            
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.notify = action.error.message;
        })
          // Handle addProduct case here:
    .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the newly added product to the products list (optional)
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
        
    }
})

export const getAllProducts = (state) => state.products;
export const getSelectedProduct = (state) => state.products.product;
export default productSlice.reducer;