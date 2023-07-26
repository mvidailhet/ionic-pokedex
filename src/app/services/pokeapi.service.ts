import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PAPokemon, PAPokemons } from '../models/pa-pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(limit = 20, offset = 0) {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.http.get<PAPokemons>(this.apiUrl, { params });
  }

  getPokemon(name: string) {
    return this.http.get<PAPokemon>(`${this.apiUrl}/${name}`);
  }
}
