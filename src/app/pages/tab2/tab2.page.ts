import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  EMPTY,
  catchError,
  concatMap,
  delay,
  from,
  map,
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
  allPokemons?: (PAPokemonSimple | PAPokemon)[];
  pokemonPages: { [key: number]: PAPokemon[] } = {};
  nbPokemonsPerPage = 5;
  nbTotalElements = 0;
  currentPage = 1;

  constructor(private pokeApiService: PokeapiService, private router: Router) {
    this.goToPage(this.currentPage);

    /*     this.pokeApiService.getPokemon("bulbasaur").subscribe((pokemon: PAPokemon) => {
    }); */
  }

  getPokemonsForPage(page = 1) {
    return this.pokeApiService.getPokemons(
      this.nbPokemonsPerPage,
      (page - 1) * this.nbPokemonsPerPage
    );
  }

  isPaPokemon(pokemon: PAPokemon | PAPokemonSimple): pokemon is PAPokemon {
    return (pokemon as PAPokemon).id !== undefined;
  }

  goToPage(page = 1) {
    if (this.pokemonPages[page]) {
      this.allPokemons = this.pokemonPages[page];
      this.currentPage = page;
      return;
    }

    this.getPokemonsForPage(page)
      .pipe(
        tap((pokemons: PAPokemons) => {
          this.allPokemons = pokemons.results;
          this.nbTotalElements = pokemons.count;
          this.currentPage = page;
          console.log(pokemons);
        }),
        switchMap((pokemons: PAPokemons) => {
          return from(pokemons.results);
        }),
        mergeMap((pokemon: PAPokemonSimple, index: number) => {
          return zip(of(index), this.pokeApiService.getPokemon(pokemon.name));
        })
      )
      .subscribe(([index, pokemon]: [number, PAPokemon]) => {
        if (!this.allPokemons) return;
        this.allPokemons[index] = pokemon;
        if (!this.pokemonPages[page]) this.pokemonPages[page] = [];
        this.pokemonPages[page][index] = pokemon;
        console.log(this.pokemonPages);
      });
  }

  goToPokemonPage(name: string) {
    this.router.navigate(['/pokeapi-pokemon', name]);
  }
}
