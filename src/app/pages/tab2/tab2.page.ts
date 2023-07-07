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

  constructor(private pokeApiService: PokeapiService, private router: Router) {
    this.pokeApiService.getPokemons().subscribe((pokemons: APIPokemons) => {
      this.allPokemons = pokemons.results;
      console.log(pokemons);
    });
  }

}
