import {createSlice} from "@reduxjs/toolkit";

interface IModalNotificationsSlice {
    modalNotificationsIsOpen: boolean;
}

const modalNotificationsSlice = createSlice({
    name: 'modalNotifications',
    initialState: {
        modalNotificationsIsOpen: false
    } as IModalNotificationsSlice,
    reducers: {
        setIsOpen: (state, action) => {
            state.modalNotificationsIsOpen = action.payload;

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
} = modalNotificationsSlice.actions
export default modalNotificationsSlice.reducer