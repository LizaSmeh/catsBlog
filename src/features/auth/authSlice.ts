import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean,
    user: string | null
}
const initialState: AuthState = {
  isAuth: localStorage.getItem('isAuth') === 'true',
  user: localStorage.getItem('user') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{username: string}>) => {
            state.isAuth = true;
            state.user = action.payload.username;
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('user', action.payload.username);
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('isAuth');
            localStorage.removeItem('user');
        },

    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer
