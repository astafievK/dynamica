import {createSlice} from "@reduxjs/toolkit";

interface IMobileMenuSlice {
    mobileMenuIsOpen: boolean;
}

const MobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState: {
        mobileMenuIsOpen: false
    } as IMobileMenuSlice,
    reducers: {
        setIsOpen: (state, action) => {
            state.mobileMenuIsOpen = action.payload;

            const bodyElement = document.getElementsByTagName('body')[0];
            if (bodyElement) {
                if (action.payload) {
                    bodyElement.classList.add('scroll-locked');
                } else {
                    bodyElement.classList.remove('scroll-locked');
                }
            }
        },
    }
})

export const {
    setIsOpen,
} = MobileMenuSlice.actions
export default MobileMenuSlice.reducer