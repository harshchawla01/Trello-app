import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    fetchListsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListsSuccess: (state, action) => {
      state.loading = false;
      state.lists = action.payload;
    },
    fetchListsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addListSuccess: (state, action) => {
      state.lists.push(action.payload);
      // state.lists = [action.payload, ...state.lists];
    },
    updateListSuccess: (state, action) => {
      const index = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    deleteListSuccess: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
  },
});

export const {
  fetchListsStart,
  fetchListsSuccess,
  fetchListsFailure,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
} = listSlice.actions;

export default listSlice.reducer;
