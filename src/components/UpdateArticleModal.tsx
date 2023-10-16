import { Add } from '@mui/icons-material';
import { Box, Button, Card, Input, Modal, TextField } from '@mui/material';
import { axiosInstance } from 'api/axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from 'store';
import { ArticleDetail, articleDetailActions } from 'store/articleDetailSlice';
import { articlesActions } from 'store/articlesSlice';

interface UpdateArticleModalProps extends ArticleDetail {
    onClose: () => void;
}

export const UpdateArticleModal = ({ onClose, ...props }: UpdateArticleModalProps) => {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState(props.year_of_publication);
    const [article, setArticle] = useState<File | null>();
    const [permission, setPermission] = useState<File | null>();
    const [name, setName] = useState(props.name_article);

    console.log(props);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (date && name) {
            const data = new FormData();
            data.append('year_of_publication', date);
            if (article) {
                data.append('article', article);
                data.append('title_article', article.name);
            }
            if (permission) {
                data.append('permission', permission);
                data.append('title_permission', permission.name);
            }
            data.append('name_article', name);
            data.append('author', String(props.author.id));
            data.append('url_article', props.url_article);
            data.append('url_permission', props.url_permission);

            await axiosInstance.post(`articles/${props.id}/edit`, data).then(() => {
                axiosInstance
                    .get(`articles/${props.id}`)
                    .then((response) => dispatch(articleDetailActions.setData(response?.data)));
                axiosInstance
                    .get(`myarticles/${props.author.id}`)
                    .then((response) => dispatch(articlesActions.setData(response?.data)));
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
                    <Button onClick={() => window.open(props.url_article, '_blank')}>view previous article</Button>
                    <Button onClick={() => window.open(props.url_permission, '_blank')}>
                        view previous permission
                    </Button>
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
