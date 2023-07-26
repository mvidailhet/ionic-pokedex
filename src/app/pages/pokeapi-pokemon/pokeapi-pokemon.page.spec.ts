import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeapiPokemonPage } from './pokeapi-pokemon.page';

describe('PokeapiPokemonPage', () => {
  let component: PokeapiPokemonPage;
  let fixture: ComponentFixture<PokeapiPokemonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PokeapiPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
