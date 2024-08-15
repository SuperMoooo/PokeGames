import pokeGuess from '@/app/assets/guessPokemon.png';
import blurPokemon from '@/app/assets/blurPokemon.png';
import fightingType from '@/app/assets/fightingType.png';

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
        description: 'If next pokemon is stronger or weaker',
        link: '/pages/strongerOrWeaker',
    },
];

export type PokeRow = [
    { img: string; value: null },
    { name: string; value: string },
    { type1: string; value: string },
    { type2: string; value: string },
    { color: string; value: string },
    { habitat: string; value: string }
];
