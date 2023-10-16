import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Article {
    pk: number;
    name_article: string;
    article: string;
    permission: string;
    year_of_publication: string;
}

interface ArticlesSchema {
    data: Article[];
}

const initialState: ArticlesSchema = { data: [] };

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<Article[]>) => {
            state.data = payload;
        },
        setNewArticle: (state, { payload }: PayloadAction<Article>) => {
            state.data = [...state.data, payload];
        },
    },
});

export const { actions: articlesActions, reducer: articlesReducer } = articlesSlice;
