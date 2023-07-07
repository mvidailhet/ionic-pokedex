import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIPokemons, Pokemon } from 'src/app/models/pa-pokemons';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = "Mes pokémons";
  allPokemons?: Pokemon[];
  nbPokemonsPerPage = 20;
  currentPage = 1;
  nbTotalPage = 0;
  pages: number[] = [];

  constructor(private pokeApiService: PokeapiService, private router: Router) {
    this.goToPage(this.currentPage);
  }

  getPokemonsForPage(page = 1) {
    return this.pokeApiService.getPokemons(this.nbPokemonsPerPage, (page - 1) * this.nbPokemonsPerPage);
  }

  goToPage(page = 1) {
    this.getPokemonsForPage(page).subscribe((pokemons: APIPokemons) => {
      this.allPokemons = pokemons.results;
      console.log(pokemons);
      this.nbTotalPage = Math.ceil(pokemons.count / this.nbPokemonsPerPage);
      this.pages = Array(this.nbTotalPage);
      console.log(this.pages);
    });
  }

}
