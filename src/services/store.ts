import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, rootReducer } from '@slices';

import {
  UseSelector,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const store = configureStore({
  reducer: { ingredients: ingredientsReducer },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: UseSelector<RootState> = selectorHook;
