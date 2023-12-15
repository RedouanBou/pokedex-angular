import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokeAPI } from '../interfaces/PokeAPI';
import { PokemonDetails } from '../interfaces/PokemonDetails';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeAPI: any;
  pokeSpeciesAPI: any;

  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
  }

  // Returns original 151 pokemon
  getPokemon(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeAPI}?limit=151`)
      .pipe(catchError(this._handleError));
  }

  // Uses pokemon to retrieve individual pokemon details
  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
      .pipe(catchError(this._handleError));
  }

  //  Uses pokemon name to retrieve individual pokemon species details
  getPokemonSpecies(name: string): Observable<any> {
    return this.http
      .get<any>(`${this.pokeSpeciesAPI}/${name}`)
      .pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message); // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    const newError = new Error('Something bad happened; please try again later.');
    return throwError(newError); // return an observable with a user-facing error message
  }
}
