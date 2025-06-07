import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

interface AuthSlice {
    user: IUser | null;
    isAuthenticated: boolean;
}

const initialState: AuthSlice = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            const payload = action.payload;

            // Гарантируем, что permissions — всегда массив для избежания ошибок
            state.user = {
                ...payload,
                permissions: Array.isArray(payload.permissions) ? payload.permissions : [],
            };

            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const {
    login,
    logout
} = authSlice.actions
export default authSlice.reducer