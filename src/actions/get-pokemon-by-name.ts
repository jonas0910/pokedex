import type {
  Chain,
  EvolutionChain,
  PokemonDetail,
  PokemonSelected,
  PokemonSpecie,
} from "../types/pokemones";

const getPokemonByName = async (
  name: string
): Promise<PokemonSelected | null> => {
  try {
    const responseDetail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemonDetail: PokemonDetail = await responseDetail.json();
    const responseSpecie = await fetch(
      pokemonDetail.species.url
    );
    const pokemonSpecie: PokemonSpecie = await responseSpecie.json();

    const responseEvolution = await fetch(pokemonSpecie.evolution_chain.url);
    const evolutionChain: EvolutionChain = await responseEvolution.json();

    const getAllEvolutions = (
      chain: Chain
    ): { image: string; name: string; next: boolean }[] => {
      let evolutions: { image: string; name: string, next: boolean }[] = [];

      evolutions.push({
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url
          .split("/")
          .filter(Boolean)
          .pop()}.png`,
        name: chain.species.name,
        next: chain.evolves_to.length != 0 
      });

      for (const evolution of chain.evolves_to) {
        evolutions = evolutions.concat(getAllEvolutions(evolution)); // Concatenamos las evoluciones recursivas
      }

      return evolutions;
    };

    return {
      name: pokemonDetail.name,
      description: pokemonSpecie.flavor_text_entries.filter(
        (text) => (text.language.name == "en")
      )[0].flavor_text,
      order: pokemonDetail.order,
      image: pokemonDetail.sprites.front_default,
      height: pokemonDetail.height,
      weight: pokemonDetail.weight,
      types: pokemonDetail.types.map((t) => t.type.name),
      stats: pokemonDetail.stats.map((s) => ({
        value: s.base_stat,
        name: s.stat.name,
      })),
      evolution: getAllEvolutions(evolutionChain.chain),
    } as PokemonSelected;
  } catch (error) {
    console.error("Error fetching Pokemon Selected:", error);
    return null;
  }
};

export default getPokemonByName;
