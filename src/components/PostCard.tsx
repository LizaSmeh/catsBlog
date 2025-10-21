import { Link } from "react-router-dom";
import { type Post } from "../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card
      sx={{
        maxWidth:{
          xs: '100%',
          sm: 345
        },
        mx: "auto",
         }}
    >
      <CardMedia
        component="img"
        height="140"
        image={post.image}
        alt={post.titel}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {post.titel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Опубликовано: {formatDate(post.createdAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Комментариев: {post.comments.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/post/${post.id}`}
          size="small"
          color="primary"
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
