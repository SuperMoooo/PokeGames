import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import rightPokemonSlice from './pokeGuessSlice/rightPokemonSlice';
import rowsPokemonSlice from './pokeGuessSlice/rowsPokemonSlice';
import unknownPokemonSlice from './strongerOrWeakerSlice/unknownPokemonSlice';
import globalSlice from './globalSlice';
import blurPokemonSlice from './blurImgSlice/blurPokemonSlice';
import blurRowsSlice from './blurImgSlice/blurRowsSlice';

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
    key: 'rowsPokemon',
    storage,
};

const persistConfig3 = {
    key: 'unknownPokemon',
    storage,
};

const persistConfig4 = {
    key: 'globalAllPokemons',
    storage,
};

const persistConfig5 = {
    key: 'blurPokemon',
    storage,
};
const persistConfig6 = {
    key: 'blurRows',
    storage,
};

const persistedReducers = combineReducers({
    //PokeGuess Reducers:
    rightPokemon: persistReducer(persistConfig, rightPokemonSlice),
    rowsPokemon: persistReducer(persistConfig2, rowsPokemonSlice),
    //StrongerOrWeaker Reducers:
    unknownPokemon: persistReducer(persistConfig3, unknownPokemonSlice),
    //Global Reducers:
    globalAllPokemons: persistReducer(persistConfig4, globalSlice),
    //BlurImg Reducers:
    blurPokemon: persistReducer(persistConfig5, blurPokemonSlice),
    blurRows: persistReducer(persistConfig6, blurRowsSlice),
});
export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
