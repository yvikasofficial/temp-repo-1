import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-reducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
