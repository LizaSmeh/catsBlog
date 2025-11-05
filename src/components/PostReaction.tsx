import {
  Box,
    IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootStore } from "../app/store";
import {
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { toggleReactionAsync } from "../features/posts/postsSlice";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
}
export const PostReaction = ({ post }: PostCardProps) => {
    const likeCount = Object.keys(post.likes || {}).length;
  const dislikeCount = Object.keys(post.dislikes || {}).length;

  const dispatch = useDispatch<AppDispatch>();
  
  const user = useSelector((state: RootStore) => state.auth.user);

  const liked = !!post.likes?.[user?.uid || ""];
  const disliked = !!post.dislikes?.[user?.uid || ""];
  const handleLike = () => {
    dispatch(toggleReactionAsync({ postId: post.id, type: "like" }));
  };

  const handleDislike = () => {
    dispatch(toggleReactionAsync({ postId: post.id, type: "dislike" }));
  };
    return (<>
           <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton
                onClick={handleLike}
                color={liked ? "primary" : "default"}
                size="small"
              >
                {liked ? <ThumbUp /> : <ThumbUpOffAlt />}
              </IconButton>
              <Typography variant="body2">{likeCount}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton
                onClick={handleDislike}
                color={disliked ? "error" : "default"}
                size="small"
              >
                {disliked ? <ThumbDown /> : <ThumbDownOffAlt />}
              </IconButton>
              <Typography variant="body2">{dislikeCount}</Typography>
            </Box>
            </>
          
    )
}