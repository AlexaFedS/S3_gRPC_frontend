import { Box, Button, Card, Input, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { LOCAL_STORAGE_AUTH_TOKEN } from '../constants/localStorage';
import { useAppDispatch, useAppSelector } from '../store';
import { userActions } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        username &&
            password &&
            (await axiosInstance
                .post('auth/token/login/', { username, password })
                .then((response) => {
                    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, response.data.auth_token);
                    dispatch(userActions.setAuth(true));
                })
                .catch((e: AxiosError) => {
                    setError(e.message);
                }));
    };
    useEffect(() => {
        isAuth && navigate('/');
    }, [isAuth, navigate]);
    return (
        <Box className='bg-[#4B9EFF] flex w-full h-screen items-center justify-center'>
            <Card className='w-[560px] h-[460px] bg-white flex items-center justify-center rounded-[40px] flex-col gap-4'>
                <form
                    className='flex justify-center flex-col w-80 gap-10'
                    onSubmit={onSubmit}
                >
                    <h1 className='text-center text-3xl font-medium'>LOG IN</h1>
                    <Input
                        title='Username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        title='Password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        className='bg-[#2196f3]'
                    >
                        SIGN IN
                    </Button>
                </form>
                {error && (
                    <Typography
                        color='red'
                        textAlign='center'
                    >
                        {error}
                    </Typography>
                )}
                <Button onClick={() => navigate('/')}>Back</Button>
            </Card>
        </Box>
    );
};
