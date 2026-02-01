import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';

const FAVORITES_STORAGE_KEY = 'traveltrucks:favorites';

function loadFavoritesFromStorage() {
  try {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(String);
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(ids) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.warn('Failed to save favorites:', err);
  }
}

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: {
      ids: loadFavoritesFromStorage(),
    },
  },
});

let prevIds = store.getState().favorites?.ids;
store.subscribe(() => {
  const ids = store.getState().favorites?.ids;
  if (ids !== prevIds) {
    prevIds = ids;
    saveFavoritesToStorage(ids);
  }
});
