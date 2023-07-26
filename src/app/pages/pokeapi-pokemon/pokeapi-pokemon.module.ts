import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokeapiPokemonPageRoutingModule } from './pokeapi-pokemon-routing.module';

import { PokeapiPokemonPage } from './pokeapi-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeapiPokemonPageRoutingModule
  ],
  declarations: [PokeapiPokemonPage]
})
export class PokeapiPokemonPageModule {}
