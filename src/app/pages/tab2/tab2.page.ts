import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  delay,
  from,
  mergeMap,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import {
  PAPokemon,
  PAPokemons,
  PAPokemonSimple,
} from 'src/app/models/pa-pokemons';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  title = 'Mes pokémons';
  currentPokemons?: (PAPokemonSimple | PAPokemon)[];
  pokemonPages: { [key: number]: (PAPokemonSimple | PAPokemon)[] } = {};
  nbPokemonsPerPage = 20;
  nbTotalElements = 0;
  currentPage = 1;

  constructor(private pokeApiService: PokeapiService, private router: Router) {
    this.goToPage(this.currentPage);
  }

  getPokemonsForPage(page = 1) {
    return this.pokeApiService.getPokemons(
      this.nbPokemonsPerPage,
      (page - 1) * this.nbPokemonsPerPage
    );
  }

  isPAPokemon(pokemon: PAPokemonSimple | PAPokemon): pokemon is PAPokemon {
    return (pokemon as PAPokemon).id !== undefined;
  }

  goToPage(page = 1) {
    if (this.pokemonPages[page]) {
      this.currentPokemons = this.pokemonPages[page];
      this.currentPage = page;
      return;
    }
    this.getPokemonsForPage(page)
      .pipe(
        tap((pokemons: PAPokemons) => {
          this.currentPokemons = pokemons.results;
          this.nbTotalElements = pokemons.count;
          this.currentPage = page;
        }),
        delay(2000),
        switchMap((pokemons: PAPokemons) => from(pokemons.results)),
        mergeMap((pokemon: PAPokemonSimple, index: number) => {
          return zip(
            of(index),
            this.pokeApiService.getPokemon(pokemon.name)
          );
        })
      )
      .subscribe(([index, pokemon]: [number, PAPokemon]) => {
        if (!this.currentPokemons) return;
        this.currentPokemons[index] = pokemon;

        if (!this.pokemonPages[page]) this.pokemonPages[page] = [];
        this.pokemonPages[page][index] = pokemon;
      });
  }

  goToPokemonPage(name: string) {
    this.router.navigate(['/pokeapi-pokemon', name]);
  }
}
