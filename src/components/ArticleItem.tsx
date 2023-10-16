import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { Article } from 'store/articlesSlice';

export const ArticleItem = ({ name_article, pk }: Article) => {
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    return (
        <Box
            onClick={() => isAuth && navigate(`/article/${pk}`)}
            className={`${isAuth && 'cursor-pointer'}`}
        >
            <p className='text-4xl my-6 text-ellipsis overflow-hidden whitespace-nowrap'>{name_article}</p>
            <hr className='border-black' />
        </Box>
    );
};
