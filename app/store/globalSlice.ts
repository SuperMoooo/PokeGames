import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'globalAllPokemons',
    initialState: {
        globalAllPokemons: [],
        auxGlobalPokemons: [],
        auxGlobalPokemons2: [],
        playerName: '',
    },
    reducers: {
        setGlobalAllPokemons: (state, action) => {
            state.globalAllPokemons = action.payload;
        },
        setAuxGlobalAllPokemons: (state, action) => {
            state.auxGlobalPokemons = action.payload;
        },
        setAuxGlobalAllPokemons2: (state, action) => {
            state.auxGlobalPokemons2 = action.payload;
        },
        setPlayerName: (state, action) => {
            state.playerName = action.payload;
        },
    },
});

export const {
    setGlobalAllPokemons,
    setAuxGlobalAllPokemons,
    setAuxGlobalAllPokemons2,
    setPlayerName,
} = globalSlice.actions;

export default globalSlice.reducer;
