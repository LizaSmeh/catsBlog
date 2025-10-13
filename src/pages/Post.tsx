import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const Post = () => {
    const {id} = useParams();
  return (
    <Box p={2}>
         <Typography variant="h4">Пост #{id}</Typography>
    <Typography variant="h6">Тут будет детальная страница поста</Typography>
    </Box>
);
};