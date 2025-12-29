export interface PokemonResponse {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  order: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  species: { url: string };
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}

export interface PokemonSpecie {
  evolution_chain: { url: string };
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export interface Chain {
  evolves_to: Chain[];
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  chain: Chain;
}

export interface PokemonList {
  name: string;
  order: number;
  types: string[];
  image: string;
}

export interface PokemonSelected {
  name: string;
  order: number;
  types: string[];
  image: string;
  description: string;
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  evolution: {
    name: string;
    image: string;
    next: boolean;
  }[];
}
