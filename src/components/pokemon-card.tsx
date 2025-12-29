import { Badge } from "./ui/badge";
import { Card, CardContent, CardTitle } from "./ui/card";

interface PokemonCardProps {
  name?: string;
  order?: number;
  image?: string;
  types?: string[];
}

const PokemonCard = ({ name, order, image, types }: PokemonCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-900 py-4 hover:shadow-xl transition-all cursor-pointer">
      {/* Contenedor derecho con la imagen */}
      <CardContent className="flex flex-row max-w-full justify-between">
        <CardTitle className="flex flex-col justify-between items-start">
          {name!.toUpperCase()} <p className="text-sm text-muted">N°{order}</p>
          <div className="flex space-x-2 mt-2">
            {types?.map((t) => (
              <Badge key={t} variant={t as any} className="px-3 py-1">
                {t}
              </Badge>
            ))}
          </div>
        </CardTitle>

        <img
          src={image}
          alt={name}
          className="w-28 h-28 rounded-lg border-2 border-muted object-contain"
        />
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
