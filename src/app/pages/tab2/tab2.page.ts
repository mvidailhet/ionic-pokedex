import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIPokemons, Pokemon } from 'src/app/models/pa-pokemons';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  title = 'Mes pokémons';
  allPokemons?: Pokemon[];
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

  goToPage(page = 1) {
    this.getPokemonsForPage(page).subscribe((pokemons: APIPokemons) => {
      this.allPokemons = pokemons.results;
      this.nbTotalElements = pokemons.count;
      this.currentPage = page;
    });
  }

/*   isPageButtonShown(page: number) {
    return (
      page === this.currentPage ||
      page === this.currentPage - 1 ||
      page === this.currentPage + 1 ||
      page === 1 ||
      page === this.nbTotalPage
    );
  } */

/*   areFirstPageDotsShown(page: number) {
    const res = page >= 2 && page === this.currentPage - 2;
    return res;
  }

  areLastPageDotsShown(page: number) {
    const res = page <= this.nbTotalPage - 1 && page === this.currentPage + 2;
    return res;
  } */
}
