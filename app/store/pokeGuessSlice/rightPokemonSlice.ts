import { createSlice } from '@reduxjs/toolkit';

export const rightPokemonSlice = createSlice({
    name: 'rightPokemon',
    initialState: {
        rightPokemonData: [
            {
                firstData: [],
                secondData: [],
            },
        ],
    },
    reducers: {
        setCorrectPokemonData: (state, action) => {
            state.rightPokemonData[0].firstData = action.payload;
        },
        setCorrectPokemonMoreData: (state, action) => {
            state.rightPokemonData[0].secondData = action.payload;
        },
    },
});

export const { setCorrectPokemonData, setCorrectPokemonMoreData } =
    rightPokemonSlice.actions;

export default rightPokemonSlice.reducer;
