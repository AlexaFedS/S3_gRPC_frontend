import { Box, Card } from '@mui/material';
import { ArticleInfo } from '../components/ArticleInfo';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from 'store';
import { ArticleItem } from 'components/ArticleItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosInstance } from 'api/axios';
import { articleDetailActions } from 'store/articleDetailSlice';
import { articlesActions } from 'store/articlesSlice';

export const ArticlePage = () => {
    const { id } = useParams();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const data = useAppSelector((state) => state.article.data);
    const authorId = useAppSelector((state) => state.articleDetail?.data?.author?.id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        !isAuth && navigate('/');
        isAuth &&
            axiosInstance
                .get(`articles/${id}`)
                .then((response) => dispatch(articleDetailActions.setData(response.data)));
    }, [dispatch, id, isAuth, navigate]);
    useEffect(() => {
        authorId &&
            axiosInstance
                .get(`myarticles/${authorId}`)
                .then((response) => dispatch(articlesActions.setData(response?.data)));
    }, [authorId, dispatch]);
    return (
        <Box className='bg-[#4B9EFF] w-full min-h-screen'>
            <Header className='text-[#395fe7] bg-white' />
            <Box className='flex justify-between md:p-12 p-8 gap-4 flex-col md:flex-row items-center'>
                <ArticleInfo />
                <Card className='md:w-1/2 w-full md:h-[700px] h-1/2 rounded-[40px] p-[36px] overflow-y-auto'>
                    <p className='text-center text-2xl tracking-[10px] font-bold'>OTHER ARTICLES</p>
                    {data.map((article) => (
                        <ArticleItem
                            key={article.pk}
                            {...article}
                        />
                    ))}
                </Card>
            </Box>
        </Box>
    );
};
