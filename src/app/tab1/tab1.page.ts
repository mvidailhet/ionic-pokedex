import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Tous les pokémons';

  constructor(private apiService: ApiService) {

    this.apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      console.log(pokemons);
    });

  }

}
