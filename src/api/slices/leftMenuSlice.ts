import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ILeftMenuSlice {
    leftMenuIsExpanded: boolean;
}

const leftMenuSlice = createSlice({
    name: "leftMenuSlice",
    initialState: {
        leftMenuIsExpanded: true,
    } as ILeftMenuSlice,
    reducers: {
        setLeftMenuIsExpanded: (state, action: PayloadAction<boolean>) => {
            state.leftMenuIsExpanded = action.payload
        },
    }
})

export const { setLeftMenuIsExpanded } = leftMenuSlice.actions;
export default leftMenuSlice.reducer;