import pokeGuess from '@/app/assets/guessPokemon.png';
import blurPokemon from '@/app/assets/blurPokemon.png';
import fightingType from '@/app/assets/fightingType.png';

import pokeBall from '../../public/pokeBall.png';

import greatBall from '../../public/greatBall.png';

import ultraBall from '../../public/ultraBall.png';

import masterBall from '../../public/masterBall.png';
//------------------------------------------------------------
export const GAMEMODES = [
    {
        name: 'Guess Pokémon',
        image: pokeGuess,
        description: 'Guess the Pokémon thrugh try and error',
        link: '/pages/pokeGuess',
    },
    {
        name: 'Blur Image',
        image: blurPokemon,
        description: 'Guess the Pokémon from the blurred image',
        link: '/pages/blurPokemon',
    },
    {
        name: 'Stronger or Weaker',
        image: fightingType,
        description: 'Guess if the next Pokémon is stronger or weaker',
        link: '/pages/strongerOrWeaker',
    },
];
//------------------------------------------------------------

//POKEGUESS
export type PokeRow = [
    { img: string; value: null },
    { name: string; value: string },
    { gen: string; value: string },
    { type1: string; value: string },
    { type2: string; value: string },
    { color: string; value: string },
    { habitat: string; value: string }
];

export const CATEGORIES_POKEGUESS = [
    'Image',
    'Name',
    'Generation',
    'Type 1',
    'Type 2',
    'Color',
    'Habitat',
];

export const PokeBalls = [pokeBall, greatBall, ultraBall, masterBall];

export const MAX_POS = 1980;

//STRONGER OR WEAKER

export type PokeCardType = {
    name: string;
    image: string;
    attack: number;
};

//BLUR POKEMON

export type PokemonBlur = {
    name: string;
    img: number;
};

export type RowBlur = [
    { img: number; value: null },
    { name: string; value: string }
];
