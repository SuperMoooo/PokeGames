import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import rightPokemonSlice from './pokeGuessSlice/rightPokemonSlice';
import allPokemonSlice from './pokeGuessSlice/allPokemonsSlice';
import rowsPokemonSlice from './pokeGuessSlice/rowsPokemonSlice';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

export default storage;

const persistConfig = {
    key: 'rightPokemon',
    storage,
};
const persistConfig2 = {
    key: 'allPokemon',
    storage,
};
const persistConfig3 = {
    key: 'rowsPokemon',
    storage,
};

const persistedReducers = combineReducers({
    rightPokemon: persistReducer(persistConfig, rightPokemonSlice),
    allPokemons: persistReducer(persistConfig2, allPokemonSlice),
    rowsPokemon: persistReducer(persistConfig3, rowsPokemonSlice),
});
export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
