import { PokemonBlur } from '@/app/lib/constants';
import { createSlice } from '@reduxjs/toolkit';

export const blurPokemonSlice = createSlice({
    name: 'blurPokemon',
    initialState: {
        blurPokemonData: [] as PokemonBlur[],
    },
    reducers: {
        setCorrectPokemonBlur: (state, action) => {
            state.blurPokemonData = action.payload;
        },
    },
});

export const { setCorrectPokemonBlur } = blurPokemonSlice.actions;

export default blurPokemonSlice.reducer;
