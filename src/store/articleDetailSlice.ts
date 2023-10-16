import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ArticleDetail {
    id: number;
    name_article: string;
    author: Author;
    year_of_publication: string;
    url_permission: string;
    url_article: string;
}

export interface Author {
    date_joined: string;
    email: string;
    first_name: string;
    groups: any[];
    id: number;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    last_name: string;
    password: string;
    user_permissions: any[];
    username: string;
}

interface ArticleDetailSchema {
    data: ArticleDetail;
}

const initialState: ArticleDetailSchema = {
    data: {} as ArticleDetail,
};

export const articleDetailSlice = createSlice({
    name: 'articleDetail',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<ArticleDetail>) => {
            state.data = payload;
        },
    },
});

export const { actions: articleDetailActions, reducer: articleDetailReducer } = articleDetailSlice;
