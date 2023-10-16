import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { userReducer } from './userSlice';
import { articlesReducer } from './articlesSlice';
import { articleDetailReducer } from './articleDetailSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        article: articlesReducer,
        articleDetail: articleDetailReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
