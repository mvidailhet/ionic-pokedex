import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemons';
import { Utils } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Tous les pokémons';
  pokemons?: Pokemon[];

  constructor(private apiService: ApiService, private router: Router) {

    this.apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemons = pokemons.filter((pokemons: Pokemon, index: number) => index > 0 && index < 151);
      console.log(this.pokemons);
    });

  }

  goToPokemonPage(pokemonName: string) {
    const pokemonSlug = Utils.removeSpecialCharacters(pokemonName);
    this.router.navigate(['/pokemon', pokemonSlug]);
  }

}
