import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
    id: number;
    email: string;
    username: string;
}

interface UserSchema {
    data: User;
    isAuth: boolean;
}

const initialState: UserSchema = { data: {} as User, isAuth: false };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
        reset: () => initialState,
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
