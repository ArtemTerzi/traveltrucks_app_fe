import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCamperById, fetchCampers } from '../api/api';

/* ======================= FEATURE HELPERS ======================= */

const FEATURE_MAP = {
  automatic: camper => camper.transmission === 'automatic',
  petrol: camper => camper.engine === 'petrol',
};

/* ======================= FILTERS ======================= */

function applyClientFilters(items = [], filters = {}) {
  const location = filters.location?.trim().toLowerCase();
  const form = filters.form;
  const features = filters.features || {};

  const activeFeatures = Object.keys(features).filter(key => features[key]);

  return items.filter(camper => {
    if (
      location &&
      !String(camper.location || '')
        .toLowerCase()
        .includes(location)
    ) {
      return false;
    }

    if (form && String(camper.form) !== String(form)) {
      return false;
    }

    return activeFeatures.every(key => {
      if (FEATURE_MAP[key]) {
        return FEATURE_MAP[key](camper);
      }
      return Boolean(camper[key]);
    });
  });
}

function buildServerParams(filters = {}, page, limit) {
  const params = { page, limit };

  if (filters.location?.trim()) {
    params.location = filters.location.trim();
  }

  if (filters.form) {
    params.form = filters.form;
  }

  Object.entries(filters.features || {}).forEach(([key, value]) => {
    if (!value) return;

    if (key === 'automatic') {
      params.transmission = 'automatic';
    } else if (key === 'petrol') {
      params.engine = 'petrol';
    } else {
      params[key] = true;
    }
  });

  return params;
}

/* ======================= SHARED THUNK LOGIC ======================= */

async function loadCampersPage(thunkAPI, page) {
  const state = thunkAPI.getState();
  const { filters, campers } = state;

  const params = buildServerParams(filters, page, campers.limit);
  const data = await fetchCampers(params);

  const rawItems = data?.items ?? data ?? [];
  const items = applyClientFilters(rawItems, filters);

  return {
    items,
    page,
    receivedCount: rawItems.length,
    totalFromServer: data?.total ?? null,
  };
}

/* ======================= THUNKS ======================= */

export const getCampers = createAsyncThunk(
  'campers/getAll',
  async (_, thunkAPI) => {
    try {
      return await loadCampersPage(thunkAPI, 1);
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.message ?? 'Failed to load campers');
    }
  }
);

export const loadMoreCampers = createAsyncThunk(
  'campers/loadMore',
  async (_, thunkAPI) => {
    const { campers } = thunkAPI.getState();

    if (!campers.hasMore) {
      return {
        items: [],
        page: campers.page,
        receivedCount: 0,
        totalFromServer: null,
      };
    }

    try {
      return await loadCampersPage(thunkAPI, campers.page + 1);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.message ?? 'Failed to load more campers'
      );
    }
  }
);

export const getCamperDetails = createAsyncThunk(
  'campers/getById',
  async (id, thunkAPI) => {
    try {
      const camper = await fetchCamperById(id);

      if (!camper?.id) {
        return thunkAPI.rejectWithValue('Camper not found');
      }

      return camper;
    } catch (e) {
      if (e?.response?.status === 404) {
        return thunkAPI.rejectWithValue('Camper not found');
      }

      return thunkAPI.rejectWithValue(
        e?.response?.data?.message ?? e?.message ?? 'Failed to load camper'
      );
    }
  }
);

/* ======================= SLICE ======================= */

const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 4,
  hasMore: true,

  isLoading: false,
  error: null,

  detailsById: {},
  detailsLoading: false,
  detailsError: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetSearchResults(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // NEW SEARCH
      .addCase(getCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.items = payload.items;
        state.page = payload.page;

        state.hasMore = payload.receivedCount === state.limit;
        state.total = payload.totalFromServer ?? payload.items.length;
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error?.message ?? 'Failed to load campers';
      })

      // LOAD MORE
      .addCase(loadMoreCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMoreCampers.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.items.push(...payload.items);
        state.page = payload.page;

        state.hasMore = payload.receivedCount === state.limit;

        if (payload.totalFromServer != null) {
          state.total = payload.totalFromServer;
        }
      })
      .addCase(loadMoreCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          action.error?.message ??
          'Failed to load more campers';
      })

      // DETAILS
      .addCase(getCamperDetails.pending, state => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(getCamperDetails.fulfilled, (state, { payload }) => {
        state.detailsLoading = false;
        if (payload?.id != null) {
          state.detailsById[payload.id] = payload;
        }
      })
      .addCase(getCamperDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError =
          action.payload ?? action.error?.message ?? 'Failed to load camper';
      });
  },
});

/* ======================= EXPORTS ======================= */

export const { resetSearchResults } = campersSlice.actions;

// selectors
export const selectCampersItems = state => state.campers.items;
export const selectCampersTotal = state => state.campers.total;
export const selectCampersIsLoading = state => state.campers.isLoading;
export const selectCampersError = state => state.campers.error;

export const selectCampersHasMore = state => state.campers.hasMore;
export const selectCampersPage = state => state.campers.page;

export const selectCamperDetailsMap = state => state.campers.detailsById;
export const selectCamperDetailsLoading = state => state.campers.detailsLoading;
export const selectCamperDetailsError = state => state.campers.detailsError;

export const selectCamperDetails = (state, id) => state.campers.detailsById[id];

export default campersSlice.reducer;
