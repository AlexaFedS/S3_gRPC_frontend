import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from 'store';
import { axiosInstance } from 'api/axios';
import { articlesActions } from 'store/articlesSlice';
import { ArticleItem } from 'components/ArticleItem';
import { Box, Button } from '@mui/material';
import { AddArticleModal } from 'components/AddArticleModal';

export const MainPage = () => {
    const [isModal, setIsModal] = useState(false);
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const data = useAppSelector((state) => state.article.data);
    const dispatch = useAppDispatch();
    useEffect(() => {
        axiosInstance.get('articles').then((response) => dispatch(articlesActions.setData(response?.data)));
    }, [dispatch]);
    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='16px'
        >
            <Header
                className='bg-[#4B9EFF] text-white'
                buttonClassName='text-white border-white hover:border-white'
            />
            {isAuth && (
                <Box
                    display='flex'
                    justifyContent='center'
                >
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => setIsModal(true)}
                    >
                        ADD ARTICLE
                    </Button>
                </Box>
            )}
            <Box className='py-6 px-10'>
                <p className='text-center'>LIST OF ARTICLES</p>
                {data.map((article) => (
                    <ArticleItem
                        key={article.pk}
                        {...article}
                    />
                ))}
            </Box>
            {isModal && <AddArticleModal onClose={() => setIsModal(false)} />}
        </Box>
    );
};
