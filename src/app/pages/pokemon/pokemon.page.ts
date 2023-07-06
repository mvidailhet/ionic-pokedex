import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemon?: Pokemon;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    const pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    if (!pokemonName) return;
    this.apiService.getPokemon(pokemonName).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  }

  ngOnInit() {
  }

}
