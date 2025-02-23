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
            if (bodyElement) {
                if (action.payload) {
                    bodyElement.classList.add("scroll-locked");
                } else {
                    bodyElement.classList.remove("scroll-locked");
                }
            }
        },
    },
});

export const { updateScrollLock } = scrollLockSlice.actions;
export default scrollLockSlice.reducer;
