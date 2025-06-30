import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DraftState {
    activeDraftId: number;
}

const initialState: DraftState = {
    activeDraftId: 0,
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setActiveDraft(state, action: PayloadAction<number>) {
            state.activeDraftId = action.payload;
        },
    },
});

export const { setActiveDraft} = draftSlice.actions;
export default draftSlice.reducer;
