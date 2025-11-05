import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootStore } from "../app/store";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { addPostAsync } from "../features/posts/postsSlice";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

interface PostForm {
    titel: string;
    content: string;
    image: string
}

export const CreatePost = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const user = useSelector((state: RootStore) => state.auth.user)


     const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<PostForm>({
        defaultValues: {
          titel: '',
    content: '',
    image: ''
        },
      });

       const onSubmit = async (data: PostForm) => {
          try{
            await dispatch(addPostAsync(data)).unwrap();
            navigate('/')

          }catch(err) {
            alert(`Ошибка при создании поста: ${err}`)
          }
        };

       
        return (
            <Container maxWidth='md' sx={{mt: 4}}>
                <Paper sx={{p: {xs:2, sm: 4}}}>
                    <Typography variant="h4" gutterBottom>
                        Создать новый пост
                    </Typography>
                    <Typography variant="body2" color="text.secondery" mb={3}>
                       Автор: {user?.email}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 2}}>
                        <Controller name="titel" control={control} rules={{required: "Введите заголовок"}} render={({field}) => (
                            <TextField {...field} label='Заголовок'  fullWidth margin="normal" error={!!errors.titel} helperText={errors.titel?.message}/>
                        )}/>
                        <Controller name="image" control={control} rules={{required: "Введите URL", pattern: {
                            value: /^https?:\/\/.+/, 
                            message: 'Введите корректный URL'
                        }}} render={({field}) => (
                            <TextField {...field} label='URL'  fullWidth margin="normal" error={!!errors.image} helperText={errors.image?.message || "Например: 'https://kocha.com/kisi.jpg'"}/>
                        )}/>
                        <Controller name="content" control={control} rules={{required: "Введите текст"}} render={({field}) => (
                            <TextField {...field} label='Текст поста' multiline rows={6} fullWidth margin="normal" error={!!errors.content} helperText={errors.content?.message}/>
                        )}/>
                        <Box sx={{mt:3, display: 'flex', gap: 2}}>
                            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                                {isSubmitting? 'Публикация...' : 'Опубликовать'}
                            </Button>
                            <Button  variant="outlined" onClick={() => navigate(-1)}>
                                Отмена
                            </Button>

                        </Box>
                    </Box>
                </Paper>
            </Container>
        )
}