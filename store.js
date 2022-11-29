import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slices/historySlice";

export default configureStore({
  reducer: {
    history: historyReducer,
  },
});
