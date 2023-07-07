import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIPokemons } from '../models/pa-pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get<APIPokemons>(this.apiUrl);
  }
}
