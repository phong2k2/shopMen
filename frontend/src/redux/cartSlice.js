import toastify from "@/components/toastify/toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { orderItem } = action.payload;
      const itemOrder = state?.cartItems.find(
        (item) =>
          item.product === orderItem.product &&
          item.color === orderItem.color &&
          item.size === orderItem.size
      );

      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.cartItems.push(orderItem);
      }
    },
    decreaseCart(state, action) {
      const { itemProduct } = action.payload;
      const itemOrder = state?.cartItems?.find(
        (item) =>
          item.product === itemProduct.product &&
          item.color === itemProduct.color &&
          item.size === itemProduct.size
      );
      itemOrder.amount--;
    },
    increaseCart(state, action) {
      const { itemProduct } = action.payload;
      const itemOrder = state?.cartItems?.find(
        (item) =>
          item.product === itemProduct.product &&
          item.color === itemProduct.color &&
          item.size === itemProduct.size
      );
      itemOrder.amount++;
    },
    removeFromCart(state, { payload: itemRemove }) {
      if (!itemRemove) {
        return toastify({
          type: "error",
          message: "Xóa thất bại",
        });
      }

      const itemsToRemove = Array.isArray(itemRemove)
        ? itemRemove
        : [itemRemove];

      const nextCartItems = state?.cartItems?.filter((item) => {
        return !itemsToRemove.some(
          (removeItem) =>
            item.product === removeItem.product &&
            item.color === removeItem.color &&
            item.size === removeItem.size
        );
      });

      state.cartItems = nextCartItems;

      toastify({
        type: "success",
        message: "Xóa thành công",
      });
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.quantity += amount;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
