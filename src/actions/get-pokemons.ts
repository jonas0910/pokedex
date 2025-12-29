import type { PokemonList } from "../types/pokemones";

const getPokemonList = async (): Promise<PokemonList[] | null> => {
  try {
    // Obtener la lista de Pokémon
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
    const data = await response.json();
    const pokemonData = data.results;

    // Obtener detalles de cada Pokémon
    const detailedPokemon: PokemonList[] = await Promise.all(
      pokemonData.map(async (pokemon: { name: string; url: string }) => {
        const detailRes = await fetch(pokemon.url);
        const detailData = await detailRes.json();
        const { name, order, types, sprites }: any = detailData;

        const pokemonTypes = types.map(
          (type: { type: { name: string } }) => type.type.name
        );
        // const pokemonImage = sprites.other["official-artwork"].front_default;
        const pokemonImage = sprites.front_default;

        return {
          name,
          order,
          types: pokemonTypes,
          image: pokemonImage,
        } as PokemonList;
      })
    );

    return detailedPokemon;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return null;
  }
};

export default getPokemonList;
