import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type RootStore } from "../app/store";
import { useEffect } from "react";
import { getPosts } from "../features/posts/postsSlice";
import { PostCard } from "../components";

export const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootStore) => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Box p={2}>
      <Typography variant="h4">Главная страница</Typography>

      {posts.length === 0 ? (
        <Typography variant="h6">Нет постов</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post.id} size={{xs: 12, sm: 6, md: 3}}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
