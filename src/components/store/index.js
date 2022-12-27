import { configureStore, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const itemCounterSlice = createSlice({
  name: "itemCounter",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    increment(state) {
      state.totalQuantity++;
    },
    decrement(state) {
      state.totalQuantity--;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      dispatch(
        uiActions.setNotification({
          status: "pending",
          title: "sending",
          message: "sending data",
        })
      )
    );

    const sendRequest = async () => {
      const response = await fetch("https://meal-app-dc1d9-default-rtdb.firebaseio.com/cart.json", {
        method: "put",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "success!",
          message: "sent data!",
        })
      );
    } catch (error) {
      dispatch({
        status: "error",
        title: "Error!",
        message: "Sending data failed.",
      });
    }
  };
};

const store = configureStore({
  reducer: { counter: itemCounterSlice.reducer, ui: uiSlice.reducer },
});

export const uiActions = uiSlice.actions;
export const counterActions = itemCounterSlice.actions;
export default store;
