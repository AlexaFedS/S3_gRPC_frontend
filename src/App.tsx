import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { MainPage } from './pages/MainPage';
import { ArticlePage } from './pages/ArticlePage';
import { useAppDispatch, useAppSelector } from 'store';
import { axiosInstance } from 'api/axios';
import { useEffect } from 'react';
import { userActions } from 'store/userSlice';
import { Box } from '@mui/material';
import { LOCAL_STORAGE_AUTH_TOKEN } from 'constants/localStorage';

export const App = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        !isAuth && localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
        isAuth && axiosInstance.get('auth/users/me/').then((response) => dispatch(userActions.setData(response.data)));
    }, [dispatch, isAuth]);
    return (
        <Box>
            <Routes>
                <Route
                    path='/'
                    element={<MainPage />}
                />
                <Route
                    path='/login'
                    element={<LoginPage />}
                />
                <Route
                    path='/registration'
                    element={<RegistrationPage />}
                />
                <Route
                    path='/article/:id'
                    element={<ArticlePage />}
                />
            </Routes>
        </Box>
    );
};
