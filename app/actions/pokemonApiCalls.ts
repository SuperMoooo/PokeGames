'use server';
export const allPokemons = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_FIND_POKEMON}?limit=100000&offset=0`,
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
