import { Results } from "./Results";

export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
}