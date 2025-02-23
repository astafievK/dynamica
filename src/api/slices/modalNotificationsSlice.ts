import { createSlice } from "@reduxjs/toolkit";

interface IModalNotificationsSlice {
    modalNotificationsIsOpen: boolean;
}

const modalNotificationsSlice = createSlice({
    name: "modalNotifications",
    initialState: {
        modalNotificationsIsOpen: false,
    } as IModalNotificationsSlice,
    reducers: {
        setModalNotificationsIsOpen: (state, action) => {
            state.modalNotificationsIsOpen = action.payload;
        },
    },
});

export const { setModalNotificationsIsOpen } = modalNotificationsSlice.actions;
export default modalNotificationsSlice.reducer;
