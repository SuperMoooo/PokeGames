import pokeGuess from '@/app/assets/guessPokemon.png';
import blurPokemon from '@/app/assets/blurPokemon.png';
import fightingType from '@/app/assets/fightingType.png';

import pokeBall from '../../public/pokeBall.png';

import greatBall from '../../public/greatBall.png';

import ultraBall from '../../public/ultraBall.png';

import masterBall from '../../public/masterBall.png';

export const GAMEMODES = [
    {
        name: 'Guess Pokemon',
        image: pokeGuess,
        description: 'Guess the Pokemon thrugh try and error',
        link: '/pages/pokeGuess',
    },
    {
        name: 'Blur Image',
        image: blurPokemon,
        description: 'Guess the pokemon from the blurred image',
        link: '/pages/blurPokemon',
    },
    {
        name: 'Stronger or Weaker',
        image: fightingType,
        description: 'Guess if the next pokemon is stronger or weaker',
        link: '/pages/strongerOrWeaker',
    },
];

export type PokeRow = [
    { img: string; value: null },
    { name: string; value: string },
    { gen: string; value: string },
    { type1: string; value: string },
    { type2: string; value: string },
    { color: string; value: string },
    { habitat: string; value: string }
];

export const PokeBalls = [pokeBall, greatBall, ultraBall, masterBall];

export const MAX_POS = 1980;
