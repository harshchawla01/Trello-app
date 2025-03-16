import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCardsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess: (state, action) => {
      state.loading = false;
      state.cards = action.payload;
    },
    fetchCardsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCardSuccess: (state, action) => {
      // state.cards.push(action.payload);
      state.cards.unshift(action.payload);
    },
    updateCardSuccess: (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards.splice(index, 1);
        state.cards.unshift(action.payload);
      }
    },
    deleteCardSuccess: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

export const {
  fetchCardsStart,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardSuccess,
  updateCardSuccess,
  deleteCardSuccess,
} = cardSlice.actions;

export default cardSlice.reducer;
