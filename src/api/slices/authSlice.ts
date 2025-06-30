import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthorizedUser } from "../../interfaces/IAuthorizedUser.ts";

interface AuthSlice {
    user: IAuthorizedUser | null;
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
        login: (state, action: PayloadAction<IAuthorizedUser>) => {
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