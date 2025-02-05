import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";

interface AuthSlice {
    user: IUser | null
}

const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        user: null,
    } as AuthSlice,
    reducers: {
        login: (state, action: PayloadAction<AuthSlice>) => {
            state.user = action.payload.user
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