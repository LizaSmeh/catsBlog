import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Post, type Comment } from "../../types";
import { child, get, onValue, push, ref, set, update } from "firebase/database";
import { db } from "../../firebase";
import type { RootStore } from "../../app/store";


interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  loading: true,
  error: null
};

export const fetchPosts = createAsyncThunk("posts/tetchPosts", async (
 ) => {
    const postsRef = ref(db, 'posts')
    return new Promise<Post[]>((res, rej) => {
      const unsubscribe = onValue(
       
      postsRef, (snapshot) => {
         console.log('hhihi', Object.keys(snapshot.val() || {}))
        const data = snapshot.val();
        if (!data) {
          res([]);
          return;
        }
        const posts: Post[] = Object.entries(data).map(([id, post]: [string, any]) => {
          const comments: Record<string, Comment> = {};
          if(post.comments) {
            Object.entries(post.comments).forEach(([cid, c]:[string, any]) => {
              comments[cid] = {
                id: cid,
                text: c.text,
                user: c.user,
                createdAt: c.createdAt
        
              }
            })
          }
          return {
            id, titel: post.titel,
            content: post.content,
            image: post.image,
            authorId: post.authorId,
            authorEmail: post.authorEmail,
            createdAt: post.createdAt,
            comments,
            likes: post.likes || {},
            dislikes: post.dislikes || {},
            
          }
        })

        posts.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
        res(posts);

    },
    (error) => {
      rej(error)
    }, 
    {
      onlyOnce: false
    }

  )
    return () => unsubscribe()

      })
})  

export const addPostAsync = createAsyncThunk(
  "posts/addPost",
  async (postData : { titel: string; content: string; image: string }, { getState }) => {
    const state = getState() as RootStore;
    const user = state.auth.user;
    if(!user) throw new Error('Не авторизован')

    const postRef = ref(db, `posts`);
    const newPostRef = push(postRef);
    const newPost = {
      titel: postData.titel,
      content: postData.content,
      image: postData.image,
      authorId: user.uid,
      authorEmail: user.email,
      createdAt: new Date().toISOString().split("T")[0],
      comments: {},
      likes: {},
      dislikes: {}
      
    };

    await set(newPostRef, newPost);
    return { id: newPostRef.key!,
      ...newPost,
           } as Post;
  }
);

export const addCommentAsync = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }: { postId: string; comment: { text: string } }, { getState }) => {
    const state = getState() as RootStore;
    const authorEmail = state.auth.user?.email || "Аноним";

    const commentRef = ref(db, `posts/${postId}/comments`);
    const newCommentRef = push(commentRef);
    const newComment = {
      text: comment.text,
      user: authorEmail,
      createdAt: new Date().toISOString().split("T")[0],
    };

    await set(newCommentRef, newComment);
    return { postId, comment: { id: newCommentRef.key!, ...newComment } };
  }
);

export const toggleReactionAsync = createAsyncThunk(
  "posts/toggleReaction",
  async({postId, type}: {postId: string, type: 'like' | 'dislike'},
    {getState}
   )=> { 
    const state = getState() as RootStore;
    const user = state.auth.user;
    if(!user) throw new Error('Не авторизован')
      const userId = user.uid;
    const postRef = ref(db);
    const snapshot = await get(child(postRef, `posts/${postId}`));
    const post = snapshot.val();
    const likes = post.likes || {};
    const dislikes = post.dislikes || {};
    const alreadyLiked = !!likes[userId];
    const alreadyDisliked = !!dislikes[userId];

    const updates: Record<string, any> = {};
    if(type === 'like') {
      if(alreadyLiked) {
        updates[`posts/${postId}/likes/${userId}`] = null;
        } else {
          updates[`posts/${postId}/likes/${userId}`] = true;
          if(alreadyDisliked) updates[`posts/${postId}/dislikes/${userId}`] = null;
        }
    } else {
      if(alreadyDisliked) {
        updates[`posts/${postId}/dislikes/${userId}`] = null;
        } else {
          updates[`posts/${postId}/dislikes/${userId}`] = true;
          if(alreadyLiked) updates[`posts/${postId}/likes/${userId}`] = null;
        }

    }
      await update(ref(db), updates);
      return {postId, userId, type}
   }
 
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;

      }).addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      }).addCase(fetchPosts.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки'
      }).addCase(addCommentAsync.fulfilled, (state, action) => {
  const post = state.posts.find((p) => p.id === action.payload.postId);
  if (post) {
    post.comments[action.payload.comment.id] = action.payload.comment;
  }
}).addCase(addPostAsync.fulfilled, (state, action) => {
  state.posts.unshift(action.payload)
}).addCase(toggleReactionAsync.fulfilled, (state, action) => {
  const { postId, userId, type } = action.payload;
  const post = state.posts.find((p) => p.id === postId);
  if (!post) return;

  post.likes = post.likes || {};
  post.dislikes = post.dislikes || {};

  if (type === "like") {
    if (post.likes[userId]) {
      delete post.likes[userId];
    } else {
      post.likes[userId] = true;
      delete post.dislikes[userId];
    }
  } else {
    if (post.dislikes[userId]) {
      delete post.dislikes[userId];
    } else {
      post.dislikes[userId] = true;
      delete post.likes[userId];
    }
  }
});
    }
})


export default postSlice.reducer
