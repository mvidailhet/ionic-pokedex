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
  currentPokemons?: (PAPokemonSimple | PAPokemon)[];
  nbPokemonsPerPage = 5;
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

  goToPage(page = 1) {
    this.getPokemonsForPage(page)
      .pipe(
        tap((pokemons: PAPokemons) => {
          this.allPokemons = pokemons.results;
          this.currentPokemons = pokemons.results;
          this.nbTotalElements = pokemons.count;
          this.currentPage = page;
        }),
        delay(2000),
        switchMap((pokemons: PAPokemons) => from(pokemons.results)),
        mergeMap((pokemon: PAPokemonSimple, index: number) => {
          if (index === 2) {
            return zip(
              of(index),
              this.pokeApiService.getPokemon('lolilol').pipe(
                delay(1000),
                catchError((error) => {
                  console.error(error);
                  return EMPTY;
                })
              )
            );
          }
          return zip(
            of(index),
            this.pokeApiService.getPokemon(pokemon.name).pipe(delay(1000))
          );
        }),
      )
      .subscribe(([index, pokemon]: [number, PAPokemon]) => {
        if (!this.currentPokemons) return;
        this.currentPokemons[index] = pokemon;
        console.log(index);
        console.log(pokemon);
      });
  }

  goToPokemonPage(name: string) {
    this.router.navigate(['/pokeapi-pokemon', name]);
  }
}
