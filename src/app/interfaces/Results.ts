import { PokemonDetails } from "./PokemonDetails";

export interface Results {
    name: string;
    url: string;
    id?: string;
    details?: PokemonDetails;
    description?: string;
}