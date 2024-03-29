import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokeAPI } from 'src/app/interfaces/PokeAPI';
import { PokemonDetails } from 'src/app/interfaces/PokemonDetails';
import { Results } from 'src/app/interfaces/Results';
import { TYPE_COLOURS } from 'src/app/interfaces/TYPE_COLOURS';

@Component({
  selector: 'app-pokemon-homepage-component',
  templateUrl: './pokemon-homepage-component.component.html',
  styleUrls: ['./pokemon-homepage-component.component.scss']
})
export class PokemonHomepageComponentComponent implements OnInit {

  @Output() exportPokemons = new EventEmitter();
  pokemonsLoaded?: boolean;
  pokemons: PokeAPI;
  query: string;
  abilityFilters: Array<string>;
  typeFilters: string;

  @Input() set search(newSearch: string) {
    if (newSearch !== this.query) {
      this.query = newSearch;
    }
  }

  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.typeFilters = type;
    }
  }

  @Input() set abilityFilter(abilities: Array<string>) {
    if (abilities !== this.abilityFilters) {
      this.abilityFilters = abilities;
    }
  }

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonsLoaded = false;
    this.getPokemons();
  }

  // Loads in all 151 Original pokemon and gets their details and species details
  getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        // get pokemon details for every pokemon
        this.pokemons.results.forEach(pokemon => {
          // set pokemon id
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];

          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }

  //Gets and sets a pokemons details
  getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        // send pokemons to header component
        if (pokemon.id === '151') {
          this.pokemonsLoaded = true;
          this.exportPokemons.emit(this.pokemons?.results);
        }
      });
  }

  /**
   * Gets and sets a species details
   * (currently only sets the description -
   * would be used when card is clicked and either
   * a new page/dialog with further information on
   * a pokemon is shown)
   */
  getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some((flavor: { language: { name: string }, flavor_text: string }) => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }

  // returns colour based on type mapped in TYPE_COLOURS interface
  _getTypeColour(type: string): string | undefined  {
    if (type) {
      return '#' + (TYPE_COLOURS as any)[type];
    }

    return undefined;
  }

}
