import { RowBlur } from '@/app/lib/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const blurRowsSlice = createSlice({
    name: 'rowBlur',
    initialState: {
        data: [] as RowBlur[],
    },
    reducers: {
        setBlurRows: (state, action: PayloadAction<RowBlur>) => {
            state.data.push(action.payload);
        },
        resetBlurRows: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setBlurRows, resetBlurRows } = blurRowsSlice.actions;

export default blurRowsSlice.reducer;
