import { createReducer, createSlice } from '@reduxjs/toolkit';

export const rootReducer = createReducer({}, (builder) => builder);

export const slice = createSlice({
  name: 'slice',
  initialState: {},
  reducers: {}
});
