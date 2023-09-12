import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
          const { orderItem} = action.payload
          const itemOrder = state?.cartItems.find(item => item.product === orderItem.product)

          if(itemOrder) {
            itemOrder.amount += orderItem?.amount
          }else {
            state.cartItems.push(orderItem)
          }
        },
        decreaseCart(state, action) {
          const {idProduct} = action.payload
          const itemOrder = state?.cartItems?.find(item => item.product === idProduct)
          itemOrder.amount--
        },
        increaseCart(state, action) {
          const {idProduct} = action.payload
          const itemOrder = state?.cartItems?.find(item => item.product === idProduct)
          itemOrder.amount++
        },
        removeFromCart(state, action) {
          const {idProduct} = action.payload
              const nextCartItems = state?.cartItems?.filter(
                (item) => item.product !== idProduct
              )
              state.cartItems = nextCartItems;
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
    }
})

export const {
    addToCart,
    decreaseCart,
    increaseCart,
    removeFromCart,
    getTotals,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer