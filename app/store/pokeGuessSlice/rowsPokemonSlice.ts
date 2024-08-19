import { PokeRow } from '@/app/lib/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const rowsPokemonSlice = createSlice({
    name: 'rowPokemon',
    initialState: {
        data: [] as PokeRow[],
    },
    reducers: {
        setPokemonRows: (state, action: PayloadAction<PokeRow>) => {
            state.data.push(action.payload);
        },
        resetPokemonRows: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setPokemonRows, resetPokemonRows } = rowsPokemonSlice.actions;

export default rowsPokemonSlice.reducer;
