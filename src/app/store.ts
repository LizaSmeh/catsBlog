import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import memesReducer from '../features/memes/memesSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer, 
        memes: memesReducer,
        auth: authReducer
    }
})
 export type RootStore = ReturnType<typeof store.getState>;
 export type AppDispatch = typeof store.dispatch;