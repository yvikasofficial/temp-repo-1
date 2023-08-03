import { loadState, saveState } from "@/utils/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(
    "appState",
    {
      items: [],
      order: null as any,
      visible: false,
    },
    {
      visible: false,
    }
  ),
  reducers: {
    clearStore: () => {
      const newState = {
        items: [],
        order: null,
        visible: false,
      };

      saveState("appState", newState);
      return newState;
    },
    toggleCart: (state: any) => {
      const newState = {
        ...state,
        visible: !state?.visible,
      };
      saveState("appState", newState);
      return newState;
    },
    addItemToCart: (state: any, payload) => {
      const newState = {
        ...state,
        items: [...state?.items, payload?.payload],
        order: null,
      };
      saveState("appState", newState);
      return newState;
    },
    removeItemFromCart: (state: any, payload) => {
      const newState = {
        ...state,
        items: [
          ...state.items?.filter(
            (item: any) => item?.product?.id !== payload?.payload?.id
          ),
        ],
        order: null,
      };
      saveState("appState", newState);
      return newState;
    },

    setOrder: (state: any, payload) => {
      const newState = {
        ...state,
        order: payload?.payload,
      };
      saveState("appState", newState);
      return newState;
    },
  },
});

// Action creators are generated for each case cart function
export const {
  addItemToCart,
  removeItemFromCart,
  setOrder,
  clearStore,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
