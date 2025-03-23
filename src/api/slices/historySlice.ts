import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryItem {
    path: string;
    title: string;
}

interface HistoryState {
    history: HistoryItem[];
}

const initialState: HistoryState = {
    history: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistory: (state, action: PayloadAction<HistoryItem>) => {
            const newHistory = [action.payload, ...state.history.filter(item => item.path !== action.payload.path)];
            state.history = newHistory.slice(0, 5);
        },
    },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
