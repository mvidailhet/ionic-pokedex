import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemons';
import { Utils } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  title = 'Tous les pokémons';
  allPokemons?: Pokemon[];
  pokemons?: Pokemon[];
  showSearchBar = false;
  currentSearch = '';

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.allPokemons = pokemons.filter(
        (pokemons: Pokemon, index: number) => index > 0 && index < 151
      );
      this.pokemons = this.allPokemons;
      console.log(this.pokemons);
    });
  }

  onSearchChange(event: Event) {
    const customEvent = event as CustomEvent;
    this.currentSearch = customEvent.detail.value;

    if (this.currentSearch.length < 3) {
      this.currentSearch = '';
    };

    this.filterPokemonsByCurrentSearch();
  }

  filterPokemonsByCurrentSearch() {
    if (!this.allPokemons) return;
    this.pokemons = this.allPokemons.filter((pokemon) => {
      const transformedName = pokemon.name.fr.toLowerCase();
      const withoutAccentsName = Utils.removeSpecialCharacters(transformedName);
      return (
        !this.currentSearch ||
        transformedName.includes(this.currentSearch) ||
        withoutAccentsName.includes(this.currentSearch)
      );
    });
  }

  goToPokemonPage(pokemonName: string) {
    const pokemonSlug = Utils.removeSpecialCharacters(pokemonName);
    this.router.navigate(['/pokemon', pokemonSlug]);
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
}
