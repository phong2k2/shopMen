import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: null,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategorySuccess: (state, action) => {
            state.allCategory = action.payload
        }
    }
})

export const {
    getCategorySuccess,
} = categorySlice.actions

export default categorySlice.reducer