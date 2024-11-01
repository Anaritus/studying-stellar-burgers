import { getFeedsApi, getIngredientsApi, getOrdersApi } from '@api';
import {
  combineReducers,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('get/ingredients', async () =>
  getIngredientsApi()
);

export const getFeeds = createAsyncThunk('get/feeds', async () =>
  getFeedsApi()
);

export const getorders = createAsyncThunk('get/orders', async () =>
  getOrdersApi()
);

type TIngredients = {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
};
const initialState: TIngredients = {
  data: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const rootReducer = combineReducers({ ingredients: ingredientsReducer });
export const { getIngredientsSelector } = ingredientsSlice.selectors;
