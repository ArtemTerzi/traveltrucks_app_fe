import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.ids = action.payload;
    },
    toggleFavorite(state, action) {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(item => item !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { setFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
