import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IEmployeesContainerSlice {
    style: "new" | "old";
}

const initialState: IEmployeesContainerSlice = {
    style: "new",
};

const employeesContainerSlice = createSlice({
    name: "employeesContainerSlice",
    initialState,
    reducers: {
        setEmployeesContainerStyle: (state, action: PayloadAction<"new" | "old">) => {
            state.style = action.payload
        },
    }
})

export const { setEmployeesContainerStyle } = employeesContainerSlice.actions;
export default employeesContainerSlice.reducer;