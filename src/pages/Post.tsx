import {
  Box,
  Button,
  CardMedia,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootStore } from "../app/store";
import { Controller, useForm } from "react-hook-form";
import { addCommentAsync } from "../features/posts/postsSlice";
import { PostReaction } from "../components";

interface CommentForm {
  text: string;
}

export const Post = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const post = useSelector((state: RootStore) =>
    state.posts.posts.find((p) => p.id === id)
  );

  const isAuth = useSelector((state: RootStore) => state.auth.isAuth);

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
    if (id) {
      dispatch(
        addCommentAsync({
          postId: id,
          comment: {
            text: data.text,
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
        Опубликованно: {formatDate(post.createdAt)} | Автор: {post.authorEmail}
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
      {isAuth && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={3}
          p={2}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <PostReaction post={post} />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Комментарии ({Object.keys(post.comments).length})
      </Typography>
      {Object.keys(post.comments).length === 0 ? (
        <Typography>Нет комментариевю</Typography>
      ) : (
        <List>
          {Object.values(post.comments).map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                p: 1,
                mb: 1,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="500"
                  color="text.primary"
                  gutterBottom
                >
                  {comment.user}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={0.5}
                >
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Box
                sx={{
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                  bgcolor: "background.default",
                  width: "100%",
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1.5,
                  boxSizing: "border-box",
                }}
              >
                <Typography variant="body2" color="text.primary">
                  {comment.text}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      {isAuth ? (
        <Box
          mt={3}
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Добавить комментарий
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="text"
              control={control}
              rules={{
                required: "Введите текст комментария",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ваш комментарий"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!errors.text}
                  helperText={errors.text?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Отправить
            </Button>
          </form>
        </Box>
      ) : (
        <Typography mt={2}>
          <Link to="/login">Войдите</Link>, чтобы оставить комментарий.
        </Typography>
      )}
    </Box>
  );
};
