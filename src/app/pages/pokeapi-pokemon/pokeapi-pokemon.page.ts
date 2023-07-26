import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { PAPokemon } from 'src/app/models/pa-pokemons';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokeapi-pokemon',
  templateUrl: './pokeapi-pokemon.page.html',
  styleUrls: ['./pokeapi-pokemon.page.scss'],
})
export class PokeapiPokemonPage implements OnInit {
  //pokemon?: PAPokemon;

  constructor(private activatedRoute: ActivatedRoute, private pokeAPiService: PokeapiService) {
    const pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    if (!pokemonName) return;
/*     this.pokeAPiService.getPokemon(pokemonName).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;
    }); */
  }

  ngOnInit() {
  }

}
