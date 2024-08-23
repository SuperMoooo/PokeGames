import { PokeCardType } from '@/app/lib/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const unknownPokemon = createSlice({
    name: 'unknownPokemon',
    initialState: {
        listOfPokemonForStrongerOrWeaker: [] as PokeCardType[],
    },
    reducers: {
        setPokemonsForStrongerOrWeaker: (
            state,
            action: PayloadAction<PokeCardType>
        ) => {
            state.listOfPokemonForStrongerOrWeaker.push(action.payload);
        },
        resetList: (state, action) => {
            state.listOfPokemonForStrongerOrWeaker = action.payload;
        },

        removeElement: (state, action) => {
            state.listOfPokemonForStrongerOrWeaker =
                state.listOfPokemonForStrongerOrWeaker.filter(
                    (pokemon: any) => pokemon.name !== action.payload
                );
        },
    },
});

export const { setPokemonsForStrongerOrWeaker, resetList, removeElement } =
    unknownPokemon.actions;

export default unknownPokemon.reducer;
