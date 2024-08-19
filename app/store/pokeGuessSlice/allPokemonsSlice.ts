import { createSlice } from '@reduxjs/toolkit';

export const allPokemonSlice = createSlice({
    name: 'allPokemons',
    initialState: {
        allPokeData: [],
    },
    reducers: {
        setAllPokemons: (state, action) => {
            state.allPokeData = action.payload;
        },
        removePokemon: (state, action) => {
            state.allPokeData = state.allPokeData.filter(
                (pokemon: any) => pokemon.name !== action.payload
            );
        },
    },
});

export const { setAllPokemons, removePokemon } = allPokemonSlice.actions;

export default allPokemonSlice.reducer;
