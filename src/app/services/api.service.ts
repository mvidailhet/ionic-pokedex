import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://api-pokemon-fr.vercel.app/api/v1/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`)
  }
}
