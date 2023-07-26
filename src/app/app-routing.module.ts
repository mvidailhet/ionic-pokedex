import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScreenResizePage } from './pages/screen-resize/screen-resize.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pages/pokemon/pokemon.module').then( m => m.PokemonPageModule)
  },
  {
    path: 'screen',
    component: ScreenResizePage
  },
  {
    path: 'pokeapi-pokemon',
    loadChildren: () => import('./pages/pokeapi-pokemon/pokeapi-pokemon.module').then( m => m.PokeapiPokemonPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
