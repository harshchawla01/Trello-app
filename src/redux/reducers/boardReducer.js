import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchBoardsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBoardsSuccess: (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    },
    fetchBoardsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBoardSuccess: (state, action) => {
      // state.boards.push(action.payload);
      state.boards = [action.payload, ...state.boards];
    },
    updateBoardSuccess: (state, action) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.id
      );
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },
    deleteBoardSuccess: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
  },
});

export const {
  fetchBoardsStart,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoardSuccess,
  updateBoardSuccess,
  deleteBoardSuccess,
} = boardSlice.actions;

export default boardSlice.reducer;
