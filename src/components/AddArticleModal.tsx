import { Add } from '@mui/icons-material';
import { Box, Button, Card, Input, Modal, TextField } from '@mui/material';
import { axiosInstance } from 'api/axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from 'store';
import { articlesActions } from 'store/articlesSlice';

interface AddArticleModalProps {
    onClose: () => void;
}

export const AddArticleModal = ({ onClose }: AddArticleModalProps) => {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState('');
    const [article, setArticle] = useState<File | null>();
    const [permission, setPermission] = useState<File | null>();
    const [name, setName] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (date && name && article && permission) {
            const data = new FormData();
            data.append('year_of_publication', date);
            data.append('article', article);
            data.append('permission', permission);
            data.append('title_article', article.name);
            data.append('title_permission', permission.name);
            data.append('name_article', name);

            await axiosInstance.post('add_article', data).then((response) => {
                axiosInstance.get('articles').then((response) => dispatch(articlesActions.setData(response?.data)));
                onClose();
            });
        }
    };

    return (
        <Modal
            open
            onClose={onClose}
            className='flex justify-center items-center'
        >
            <form onSubmit={onSubmit}>
                <Card className='w-[420px] h-[640px] flex flex-col py-8 px-16 gap-8'>
                    <p className='text-center'>ADD ARTICLE</p>
                    <TextField
                        label='Article name'
                        variant='standard'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Button
                        component='label'
                        startIcon={<Add />}
                    >
                        {article ? article?.name : 'Article file'}
                        <Input
                            type='file'
                            className='hidden'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setArticle(e.target.files?.[0] ?? null)}
                        />
                    </Button>
                    <Button
                        component='label'
                        startIcon={<Add />}
                    >
                        {permission ? permission?.name : 'Permission file'}

                        <Input
                            type='file'
                            className='hidden'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPermission(e.target.files?.[0] ?? null)}
                        />
                    </Button>
                    <Box className='flex justify-between mt-auto'>
                        <Button
                            variant='outlined'
                            className='w-28'
                            type='submit'
                        >
                            COMMIT
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            className='w-28'
                            onClick={onClose}
                        >
                            CANCEL
                        </Button>
                    </Box>
                </Card>
            </form>
        </Modal>
    );
};
