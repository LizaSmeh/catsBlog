import { configureStore } from "@reduxjs/toolkit";
import postsReducer, { fetchPosts } from '../features/posts/postsSlice'
import memesReducer from '../features/memes/memesSlice'
import authReducer from '../features/auth/authSlice'
import { authListener } from "../features/auth/authListener";

export const store = configureStore({
    reducer: {
        posts: postsReducer, 
        memes: memesReducer,
        auth: authReducer
    }
})

store.dispatch(fetchPosts());
authListener();
 export type RootStore = ReturnType<typeof store.getState>;
 export type AppDispatch = typeof store.dispatch;