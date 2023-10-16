import { Box, Button } from '@mui/material';
import { axiosInstance } from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { UpdateArticleModal } from './UpdateArticleModal';
import { useState } from 'react';

export const ArticleInfo = () => {
    const data = useAppSelector((state) => state.articleDetail.data);
    const userId = useAppSelector((state) => state.user.data.id);
    const navigate = useNavigate();
    const [isModal, setIsModal] = useState(false);
    const onDeleteClick = async () => {
        await axiosInstance.post(`articles/${data.id}/delete`).then(() => navigate('/'));
    };

    return (
        <Box className='flex flex-col gap-8 md:w-1/2 w-full text-white'>
            {isModal && (
                <UpdateArticleModal
                    {...data}
                    onClose={() => setIsModal(false)}
                />
            )}
            <Box>
                <p className='text-[12px]'>Name</p>
                <p>{data.name_article}</p>
                <hr className='border-1 border-black' />
            </Box>
            <Box>
                <p className='text-[12px]'>Author</p>
                <p>{data.author?.username}</p>
                <hr className='border-1 border-black' />
            </Box>
            <Box>
                <p className='text-[12px]'>Year of publication</p>
                <p>{data.year_of_publication}</p>
                <hr className='border-1 border-black' />
            </Box>
            <Box>
                <a
                    href={data.url_article}
                    className='text-white'
                    target='_blank'
                    rel='noreferrer'
                >
                    ARTICLE
                </a>
                <hr className='border-1 border-black' />
            </Box>
            <Box>
                <a
                    href={data.url_permission}
                    className='text-white'
                    target='_blank'
                    rel='noreferrer'
                >
                    PERMISSION
                </a>
                <hr className='border-1 border-black' />
            </Box>
            {data.author?.id === userId && (
                <Box className='flex gap-4 mx-auto'>
                    <Button
                        variant='outlined'
                        color='inherit'
                        size='large'
                        onClick={() => setIsModal(true)}
                    >
                        UPDATE
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        size='large'
                        onClick={onDeleteClick}
                    >
                        DELETE
                    </Button>
                </Box>
            )}
        </Box>
    );
};
