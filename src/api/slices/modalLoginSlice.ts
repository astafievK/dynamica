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
        },
    }
})

export const { setIsOpen } = modalLoginSlice.actions
export default modalLoginSlice.reducer