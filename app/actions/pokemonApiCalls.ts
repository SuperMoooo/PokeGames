'use server';
export const allPokemons = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_GET_POKEMON}?offset=0&limit=10000`,
            {
                cache: 'force-cache',
            }
        );
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const getPokemon = async (pokemonName: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_FIND_POKEMON}/${pokemonName}`,
            {
                cache: 'force-cache',
            }
        );
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const getPokemonMoreData = async (url: string) => {
    try {
        const res = await fetch(url, {
            cache: 'force-cache',
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
