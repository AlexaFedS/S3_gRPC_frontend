import { Box, Button, Card, Input, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (name && username && email && password && repeatPassword)
            if (password !== repeatPassword) {
                setError('Пароли не совпадают');
                return;
            }
        await axiosInstance
            .post('auth/users/', { username, password, email })
            .then(() => {
                navigate('/login');
            })
            .catch((e: AxiosError) => {
                setError(e.message);
                console.log(e);
            });
    };
    return (
        <Box
            bgcolor='#4B9EFF'
            display='flex'
            width='100%'
            height='100vh'
            alignItems='center'
            justifyContent='center'
        >
            <Card className='w-[560px] h-[660px] bg-white flex items-center justify-center rounded-[40px] flex-col gap-4'>
                <form
                    className='flex justify-center flex-col w-80 gap-10'
                    onSubmit={onSubmit}
                >
                    <h1 className='text-center text-3xl font-medium'>REGISTRATION</h1>
                    <Input
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder='Repassword'
                        type='password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        className='bg-[#2196f3]'
                    >
                        SIGN UP
                    </Button>
                    {error && (
                        <Typography
                            color='red'
                            textAlign='center'
                        >
                            {error}
                        </Typography>
                    )}
                </form>
                <Button onClick={() => navigate('/')}>Back</Button>
            </Card>
        </Box>
    );
};
