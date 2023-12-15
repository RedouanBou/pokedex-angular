import { Sprites } from "./Sprites";

export interface PokemonDetails {
    name: string;
    id: number;
    sprites: Sprites;
    abilities?: Array<any>;
    types?: Array<any>;
}