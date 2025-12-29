import { useEffect, useState } from "react";
import PokemonCard from "./components/pokemon-card";
import fetchPokemonList from "./actions/get-pokemons";
import type { PokemonList } from "./types/pokemones";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import PokemonDetailCard from "./components/pokemon-detail";
import { Input } from "./components/ui/input";
import { Loader } from "lucide-react";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList[] | null>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await fetchPokemonList();
      setPokemonList(pokemons);
      setLoading(false);
    };
    fetchData();
  }, []);

  const pokemons = pokemonList?.filter(
    (pl) => pl.name.includes(search) && pl.order != -1
  );

  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-primary md:flex justify-between px-10">
        <div className="h-30 flex justify-center items-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground flex items-center gap-5">
            <img
              src="/Poké_Ball_icon.svg.png"
              className="h-15 w-15"
            />
            POKÉDEX
          </h1>
        </div>
        <div className="flex justify-center flex-row items-center text-primary-foreground">
          <p>Buscar Pokémon: </p>
          <Input
            className="m-5 dark w-50"
            type="text"
            placeholder="Buscar pokémon"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {loading ? (
          <div className="flex items-center justify-center pt-20 col-span-full">
            Cargando <Loader className="animate-spin ml-2" />
          </div>
        ) : pokemons?.length == 0 ? (
          <>No se encontraron pokemones</>
        ) : (
          <>
            {pokemons?.map((po) => (
              <Dialog key={po.name}>
                <DialogTrigger
                  onClick={() => {
                    console.log("funciona el dar click");
                  }}
                >
                  <PokemonCard
                    name={po.name}
                    order={po.order}
                    image={po.image}
                    types={po.types}
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogTitle>{po.name.toUpperCase()}</DialogTitle>
                  <PokemonDetailCard name={po.name} />
                </DialogContent>
              </Dialog>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
