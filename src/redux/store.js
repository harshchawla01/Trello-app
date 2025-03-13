import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import boardReducer from "./reducers/boardReducer";
import listReducer from "./reducers/listReducer";
import cardReducer from "./reducers/cardReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
  },
});
