import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'globalAllPokemons',
    initialState: {
        globalAllPokemons: [],
        auxGlobalPokemons: [],
        auxGlobalPokemonsStrongerOrWeaker: [],
        auxGlobalPokemonsBlur: [],
        playerName: '',
    },
    reducers: {
        setGlobalAllPokemons: (state, action) => {
            state.globalAllPokemons = action.payload;
        },
        setAuxGlobalAllPokemons: (state, action) => {
            state.auxGlobalPokemons = action.payload;
        },
        setAuxGlobalAllPokemonsStrongerOrWeaker: (state, action) => {
            state.auxGlobalPokemonsStrongerOrWeaker = action.payload;
        },
        setAuxGlobalAllPokemonsBlur: (state, action) => {
            state.auxGlobalPokemonsBlur = action.payload;
        },
        setPlayerName: (state, action) => {
            state.playerName = action.payload;
        },
    },
});

export const {
    setGlobalAllPokemons,
    setAuxGlobalAllPokemons,
    setAuxGlobalAllPokemonsStrongerOrWeaker,
    setAuxGlobalAllPokemonsBlur,
    setPlayerName,
} = globalSlice.actions;

export default globalSlice.reducer;
