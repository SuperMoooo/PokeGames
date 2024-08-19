import { createSlice } from '@reduxjs/toolkit';

export const rowsPokemonSlice = createSlice({
    name: 'rowPokemon',
    initialState: {
        data: [],
    },
    reducers: {
        setPokemonRows: (state, action): any => {
            state.data.push(action.payload);
        },
        resetPokemonRows: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setPokemonRows, resetPokemonRows } = rowsPokemonSlice.actions;

export default rowsPokemonSlice.reducer;
