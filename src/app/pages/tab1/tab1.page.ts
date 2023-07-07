import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Pokemon } from '../../models/pokemons';
import { Utils } from '../../utils/utils';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { Observable, catchError, delay, interval, map, of, switchMap, tap } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnDestroy {
  title = 'Tous les pokémons';
  allPokemons?: Pokemon[];
  pokemons?: Pokemon[];
  showSearchBar = false;
  currentSearch = '';

  constructor(
    private apiService: ApiService,
    private apiService2: PokeapiService,
    private router: Router,
    public paginationService: PaginationService
  ) {
    this.createAndSubsbscribeObservable();
    this.apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.allPokemons = pokemons.filter(
        (pokemons: Pokemon, index: number) => index > 0 && index < 151
      );
      this.pokemons = this.allPokemons;
      console.log(this.pokemons);
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  createAndSubsbscribeObservable() {
    /*     const data$ = interval(1000);
    data$.subscribe((res: number) => {
      console.log(res);
    }); */

    /*     const data$ = new Subject();
    data$.subscribe((value) => console.log(value));
    data$.next('foo');

    setTimeout(() => {
      data$.next('foo2');
    }, 3000); */

    const data$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.error(new Error('Oups!'));
      observer.next(3);
      observer.next(4);
      observer.next(6);
      //observer.complete();
    });

  data$
  .pipe(
    catchError((error: any) => {
      console.log(error);
      return of(3, 4);
    })
  )
  .subscribe({
      next: (value) => console.log(value),
      error: (err) => console.error(err),
      complete: () => console.log('DONE!'),
    });

    //subscription.unsubscribe();

/*     const data$ = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
    }); */

    //const data$ = interval(2000);

/*     data$
      .pipe(
        switchMap((page: number) => {
          return this.apiService2.getPokemons(20, page * 20);
        }),
      )
      .subscribe((value) => console.log(value.results)); */
  }

  onSearchChange(event: Event) {
    const customEvent = event as CustomEvent;
    this.currentSearch = customEvent.detail.value;

    if (this.currentSearch.length < 3) {
      this.currentSearch = '';
    }

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
