import { Injectable } from '@angular/core';
import { PokeApi, PokemonDetails, PokemonSpecies } from '../interfaces/pokeapi';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private readonly BASE_URL = "https://pokeapi.co/api/v2/pokemon"

  constructor() { }

  async getPokemonUrl(offset = 0, limit = 100000): Promise<PokeApi> {
    const url = this.BASE_URL + "?offset=" + offset + "&limit=" + limit;

    return await (await fetch(url)).json();
  }

  async getPokemonDetail(param: string | number): Promise<PokemonDetails> {
    return await (await fetch(this.BASE_URL + "/" + param)).json();
  }

  async getPokemonSpecies(url: string): Promise<PokemonSpecies> {
    return await (await fetch(url)).json();
  }
}
