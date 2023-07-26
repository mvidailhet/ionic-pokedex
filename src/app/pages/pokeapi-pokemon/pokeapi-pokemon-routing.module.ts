import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokeapiPokemonPage } from './pokeapi-pokemon.page';

const routes: Routes = [
  {
    path: ':name',
    component: PokeapiPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeapiPokemonPageRoutingModule {}
