import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../interfaces/IUser";

interface AuthSlice {
    user: User | null
}

const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        user: null,
    } as AuthSlice,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const {
    login,
    logout
} = authSlice.actions
export default authSlice.reducer