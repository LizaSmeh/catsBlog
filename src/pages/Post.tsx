import {
  Box,
  Button,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { RootStore } from "../app/store";
import { Controller, useForm } from "react-hook-form";
import { addComment } from "../features/posts/postsSlice";

interface CommentForm {
  text: string;
}

export const Post = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const post = useSelector((state: RootStore) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );

  const isAuth = useSelector((state: RootStore) => state.auth.isAuth);
  const user = useSelector((state: RootStore) => state.auth.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentForm>({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: CommentForm) => {
    if (post && user) {
      dispatch(
        addComment({
          postId: post.id,
          comment: {
            text: data.text,
            user,
          },
        })
      );
      reset();
    }
  };

  if (!post) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Пост не найден.
        </Typography>
        <Typography>К сожалению пост с ID #{id} не существует.</Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Вернуться на главную
        </Button>
      </Box>
    );
  }
  return (
    <Box
      p={{ xs: 1, sm: 2 }}
      maxWidth={{ xs: "100%", sm: 800 }}
      mx="auto"
      sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
    >
      <Typography variant="h4" gutterBottom>
        {post.titel}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Опубликованно: {formatDate(post.createdAt)}
      </Typography>
      <CardMedia
        component="img"
        image={post.image}
        alt={post.titel}
        sx={{
          height: { xs: 200, sm: 300 },
          objectFit: "cover",
          borderRadius: 1,
          mb: 2,
        }}
      />
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Комментарии
      </Typography>
      {post.comments.length === 0 ? (
        <Typography>Нет комментариевю</Typography>
      ) : (
        <List>
          {post.comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                bgcolor: "background.paper",
                borderRadius: 1,
                p: 2,
                mb: 1,
                boxShadow: 1,
              }}
            >
              <ListItemText
                primary={comment.user}
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondery">
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      {isAuth ? <Box mt={3} sx={{ bgcolor: "background.paper", p:2, borderRadius:1, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Добавить комментарий
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name='text' control={control} rules={{
            required: 'Введите текст комментария', minLength: {
              value: 5, message: 'Минимум 5 символов'   }
          }} 
          render={({field}) => (
            <TextField {...field} label='Ваш комментарий' multiline rows={4} fullWidth margin="normal" error={!!errors.text} helperText={errors.text?.message}/>
          )}/>
          <Button type='submit' variant='contained' color='primary' sx={{mt: 2}}>Отправить</Button>
        </form>
      </Box> : (<Typography mt={2}>
        <Link to='/login'>Войдите</Link>, чтобы оставить комментарий.
      </Typography>)}
    </Box>
  );
};
