import { useEffect, useState } from "react";
import type { PokemonSelected } from "../types/pokemones";
import getPokemonByName from "../actions/get-pokemon-by-name";
import { ArrowBigRight, Loader, Ruler, WeightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface PokemonDetailProps {
  name: string;
}

const PokemonDetailCard = ({ name }: PokemonDetailProps) => {
  const [pokemon, setPokemon] = useState<PokemonSelected | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch (err) {
        setError("Error loading Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return <div>No Pokémon data found</div>;
  }

  return (
    <Card className="grid md:grid-cols-2 max-w-7xl p-4">
      <CardHeader>
        <CardTitle className="text-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto mb-4"
          />
          <div className="flex flex-row justify-around mb-5">
            <p className="flex gap-2">
              <Ruler /> {pokemon.height * 10} cm
            </p>
            <p className="flex gap-2">
              <WeightIcon /> {pokemon.weight / 10} kg
            </p>
          </div>
          <p className="text-sm">{pokemon.description.replace(/\f/g, "")}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mt-4">
          <span className="font-bold">Types:</span>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((t) => (
              <Badge key={t} variant={t as any} className="px-3 py-1 ">
                {t.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <span className="font-bold">Stats:</span>
          <ul className="list-none">
            {pokemon.stats.map((stat) => (
              <li key={stat.name} className="text-xs my-2">
                {stat.name.toUpperCase()}: {stat.value}{" "}
                <Progress value={(stat.value * 100) / 200} />
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="md:col-span-2 ">
        <div className="mt-4 w-full">
          <span className="font-bold">Evolution:</span>
          <div className="flex flex-wrap justify-around mt-2 ">
            {pokemon.evolution.map((evolution) => (
              <>
                <div >
                  <div key={evolution.name} className="text-center ">
                    <img
                      src={evolution.image}
                      alt={evolution.name}
                      className="w-16 h-16 mx-auto mb-2"
                    />
                    <p className="text-sm">{evolution.name.toUpperCase()}</p>
                  </div>
                </div>
                {evolution.next && (
                  <div className="flex items-center">
                    <ArrowBigRight />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PokemonDetailCard;
