import { createSlice } from "@reduxjs/toolkit";

interface IMobileMenuSlice {
    mobileMenuIsOpen: boolean;
}

const mobileMenuSlice = createSlice({
    name: "mobileMenu",
    initialState: {
        mobileMenuIsOpen: false,
    } as IMobileMenuSlice,
    reducers: {
        setIsOpen: (state, action) => {
            state.mobileMenuIsOpen = action.payload;
        },
    },
});

export const { setIsOpen } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
