import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { axiosInstance } from 'api/axios';
import { userActions } from 'store/userSlice';
import { LOCAL_STORAGE_AUTH_TOKEN } from 'constants/localStorage';

interface HeaderProps {
    className?: string;
    buttonClassName?: string;
}

export const Header = ({ className, buttonClassName }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        await axiosInstance.post('auth/token/logout/').then(() => {
            navigate('/');
            dispatch(userActions.reset());
            localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
        });
    };
    const article = useAppSelector((state) => state.articleDetail.data);
    const { pathname } = useLocation();
    return (
        <Box className={`w-full flex items-center justify-between px-8 py-4 ${className}`}>
            <h1
                className='md:text-[48px] text-[36px] font-bold text-ellipsis overflow-hidden'
                onClick={() => navigate('/')}
            >
                {pathname.includes('article/') ? article.name_article : 'CONFERENCE'}
            </h1>
            <Box className='flex flex-col justify-between gap-4'>
                {!isAuth ? (
                    <>
                        <Button
                            variant='outlined'
                            className={`w-32 ${buttonClassName}`}
                            onClick={() => navigate('/login')}
                        >
                            LOG IN
                        </Button>
                        <Button
                            variant='outlined'
                            className={`w-32 ${buttonClassName}`}
                            onClick={() => navigate('/registration')}
                        >
                            SIGN UP
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant='outlined'
                            className={`w-32 ${buttonClassName}`}
                            onClick={onLogoutClick}
                        >
                            EXIT
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};
