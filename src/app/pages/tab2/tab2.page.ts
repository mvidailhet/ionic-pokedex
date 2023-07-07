import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = "Mes pokémons";
  allPokemons?: any[];

  constructor(private pokeApiService: PokeapiService, private router: Router) {
    this.pokeApiService.getPokemons().subscribe((pokemons: any) => {
      console.log(pokemons);
/*       this.allPokemons = pokemons.filter(
        (pokemons: Pokemon, index: number) => index > 0 && index < 151
      );
      this.pokemons = this.allPokemons;
      console.log(this.pokemons); */
    });
  }

}
