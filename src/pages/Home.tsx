import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { type RootStore } from "../app/store";
import { PostCard } from "../components";

export const Home = () => {
 
  const {posts, loading, error} = useSelector((state: RootStore) => state.posts);

  if(loading) {
    return (
      <Box display='flex' justifyContent='center' p={4}><CircularProgress/></Box>
    )
  }

  if(error) {
          <Box textAlign='center' p={4}><Typography color="error">Ошибка: {error}</Typography></Box>

  }

  return (
    <Box p={2}>
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
