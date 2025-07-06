import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DraftState {
    activeDraftId: number | null;
}

const initialState: DraftState = {
    activeDraftId: null,
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setActiveDraft(state, action: PayloadAction<number | null>) {
            state.activeDraftId = action.payload;
        },
    },
});

export const { setActiveDraft} = draftSlice.actions;
export default draftSlice.reducer;
