import { createSlice } from "@reduxjs/toolkit";

interface IScrollLockState {
    scrollLocked: boolean;
}

const scrollLockSlice = createSlice({
    name: "scrollLock",
    initialState: {
        scrollLocked: false,
    } as IScrollLockState,
    reducers: {
        updateScrollLock: (state, action) => {
            state.scrollLocked = action.payload;
            const bodyElement = document.body;
            const htmlElement = document.getElementsByTagName('html')[0];
            if (bodyElement && htmlElement) {
                if (action.payload) {
                    bodyElement.style.overflow = 'hidden';
                    htmlElement.style.overflow = 'hidden';
                } else {
                    bodyElement.style.overflow = '';
                    htmlElement.style.overflow = '';
                }
            }
        },
    },
});

export const { updateScrollLock } = scrollLockSlice.actions;
export default scrollLockSlice.reducer;
