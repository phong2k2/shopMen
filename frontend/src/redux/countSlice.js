import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  amount: 1
}

const countSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1
    },
    decrement: (state) => {
      if (state.amount > 1) state.amount -= 1
    },
    incrementByAmount: (state, action) => {
      const amount = Math.min(Math.max(action.payload, 1), 999)
      state.amount = amount
    },
    clearAmount: (state) => {
      state.amount = 1
    }
  }
})

export const { increment, decrement, incrementByAmount, clearAmount } =
  countSlice.actions

export default countSlice.reducer
