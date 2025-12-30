import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],      // Array of products
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        // If item doesn't exist, push it with quantity 1
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // If it exists, just increase quantity
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      
      // Update total amount for the whole cart
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        // Recalculate total
        state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;