import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean,
    user: { uid: string; email: string | null} | null
}
const initialState: AuthState = {
  isAuth: false,
  user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ uid: string; email: string | null} | null>) => {
            
            const user = action.payload;
            state.user = user;
            state.isAuth = !!user;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            
        },

    }
})

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer
