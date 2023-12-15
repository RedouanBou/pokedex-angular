import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { Results } from 'src/app/interfaces/Results'

@Component({
  selector: 'app-pokemon-header-component',
  templateUrl: './pokemon-header-component.component.html',
  styleUrls: ['./pokemon-header-component.component.scss']
})
export class PokemonHeaderComponentComponent implements OnInit {

  @Output() searchChange = new EventEmitter();
  @Output() typeSelected = new EventEmitter();
  @Output() abilitiesSelected = new EventEmitter();

  abilities: Array<string>;
  types: Array<string>;
  pokemonList: Array<Results>;
  search: string;
  currentType: string;
  currentAbilities: Array<string>;

  @Input() set pokemons(pokemons: Results[]) {
    if (pokemons !== this.pokemonList) {
      this.pokemonList = pokemons;

      // Get types and abilities from each pokemon
      this.pokemonList.forEach(pokemon => {
        this.setPokemonAbilities(pokemon);
        this.setPokemonTypes(pokemon);
      });
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.abilities = [];
    this.types = [];
  }

  // Called when a search field is updated
  searchEvent(search: string): void {
    // check for cleared search
    if (search === '') {
      this.search = search;
    }

    this.searchChange.emit(this.search);
  }

  // Called when a type has been selected
  onTypeSelected(): void {
    if (this.currentType) {
      this.typeSelected.emit(this.currentType);
    } else {
      this.typeSelected.emit('');
    }
  }

  // Called when ability filter changes
  onAbilitySelected(): void {
    if (this.currentAbilities && this.currentAbilities.length) {
      this.abilitiesSelected.emit(this.currentAbilities);
    } else {
      this.abilitiesSelected.emit('');
    }
  }

  // Grabs pokemons abilities and adds to array
  setPokemonAbilities(pokemon: Results): void {
    if (pokemon && pokemon.details && pokemon.details.abilities) {
      pokemon.details.abilities.forEach(ability => {
        const abilityName = ability.ability.name;
        if (!this.abilities?.includes(abilityName)) {
          this.abilities?.push(abilityName);
          this.abilities?.sort();
        }
      });
    }
  }

  //Grabs a pokemons types and adds to array
  setPokemonTypes(pokemon: Results): void {
    if (pokemon && pokemon.details && pokemon.details.types) {
      pokemon.details.types.forEach(type => {
        const typeName = type.type.name;
        if (!this.types?.includes(typeName)) {
          this.types?.push(typeName);
          this.types?.sort();
        }
      });
    }
  }
}
