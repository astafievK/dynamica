import {createSlice} from "@reduxjs/toolkit";

interface IModalLoginSlice {
    modalLoginIsOpen: boolean;
}

const modalLoginSlice = createSlice({
    name: 'modalLogin',
    initialState: {
        modalLoginIsOpen: false
    } as IModalLoginSlice,
    reducers: {
        setIsOpen: (state, action) => {
            state.modalLoginIsOpen = action.payload;

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
} = modalLoginSlice.actions
export default modalLoginSlice.reducer