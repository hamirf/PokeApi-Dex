import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonDetails, PokemonSpecies } from '../interfaces/pokeapi';
import { PokeApiService } from '../services/poke-api.service';
import { Dropdown } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemonList: PokemonDetails[] = [];
  defaultPokemonList: PokemonDetails[] = [];
  filteredPokemonList: PokemonDetails[] = [];
  pokemonSpecies: PokemonSpecies[] = [];
  pokemonService: PokeApiService = inject(PokeApiService);
  isLoaded: boolean = false;
  skeletonArr: number[] = Array(4).fill(1);

  // For Pagination
  pageSize: number = 20;
  totalPage: number = 0;
  totalPageArr: number[] = [];
  maxPagerDisplay = 5;
  displayedPageCenter = 3;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  // Pager
  pageIndex: number = 0;
  displayPageIndex: number = this.pageIndex + 1;
  /**
   *
   */
  constructor() {
    this.pokemonService.getPokemonUrl().then(async (pokeApi) => {
      for (let i = 0; i < pokeApi.results.length; i++) {
        const res = pokeApi.results[i];

        await this.pokemonService.getPokemonDetail(res.name).then((detail) => {
          this.pokemonService.getPokemonSpecies(detail.species.url).then((species) => {
            this.pokemonList.push(detail);
            this.pokemonSpecies.push(species);
          })

          console.log("Fetching from pokeapi.co...");
        })
      }

      return this.pokemonList;
    }).then((pokemons) => {
      console.log("pokemons:", pokemons);
      console.log("pokemon total:", pokemons.length);

      var prevPokemon: PokemonSpecies = this.pokemonSpecies[0];

      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const species = this.pokemonSpecies[i];
        if (i === 0 || (species.pokedex_numbers.find(dex => dex.pokedex.name.toLowerCase().includes('national'))!.entry_number > prevPokemon.pokedex_numbers.find(dex => dex.pokedex.name.toLowerCase().includes('national'))!.entry_number)) {
          this.filteredPokemonList.push(pokemon);
          prevPokemon = species;
        }
      }

      this.defaultPokemonList = this.filteredPokemonList;
      this.totalPage = Math.ceil(this.filteredPokemonList.length / this.pageSize);
      this.totalPageArr = Array.from({ length: this.totalPage }, (_, k) => k++);
      this.isLoaded = true;
    });

    // this.filteredPokemonList = this.pokemonList.sort((a, b) => a.id - b.id);
  }

  setFilteredPokemonList() {
    console.log("Pokemon Species Length:", this.pokemonSpecies.length);
    console.log("Pokemon Species", this.pokemonSpecies);
  }

  getDexNumber(name: string) {
    var dexNumStr = "#";
    var pokedexNumber = this.pokemonSpecies.find(dex => dex.name === name)?.pokedex_numbers.find(dex => dex.pokedex.name.toLowerCase().includes("national"))?.entry_number;

    if (pokedexNumber) {
      if (pokedexNumber > 999) {
        dexNumStr += pokedexNumber;
      } else if (pokedexNumber > 99) {
        dexNumStr += "0" + pokedexNumber;
      } else if (pokedexNumber > 9) {
        dexNumStr += "00" + pokedexNumber;
      } else {
        dexNumStr += "000" + pokedexNumber;
      }
    }

    return dexNumStr;
  }

  playPokemonCry(pokemon: PokemonDetails) {
    var cry = new Audio(pokemon.cries.latest);
    cry.play();
  }

  filterResults(text: string) {
    if (!text.trim()) {
      this.filteredPokemonList = this.defaultPokemonList;
      this.totalPage = Math.ceil(this.filteredPokemonList.length / this.pageSize);
      this.totalPageArr = Array.from({ length: this.totalPage }, (_, k) => k++);
      return;
    }

    this.filteredPokemonList = this.defaultPokemonList.filter(pokemon => pokemon.name.includes(text.toLowerCase().trim()));
    this.totalPage = Math.ceil(this.filteredPokemonList.length / this.pageSize);
    this.totalPageArr = Array.from({ length: this.totalPage }, (_, k) => k++);
  }

  // Pagination
  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.totalPage = Math.ceil(this.filteredPokemonList.length / this.pageSize);
    this.totalPageArr = Array.from({ length: this.totalPage }, (_, k) => k++);

    const pageSizeOptions = new Dropdown(document.getElementById("pageSizeDropdown"), document.getElementById("pageSizeDropdownButton"));
    pageSizeOptions.hide();
  }

  getFirstItemIndex() {
    if (!this.isLoaded)
      return 0;

    return this.pageIndex * this.pageSize + 1;
  }

  getLastItemIndex() {
    if (!this.isLoaded)
      return 0;

    if (this.pageIndex !== this.totalPage - 1)
      return (this.pageIndex + 1) * this.pageSize;

    return this.filteredPokemonList.length;
  }

  changePage(pageIndex: number) {
    this.pageIndex = pageIndex;

    var currPageIndex = pageIndex + 1;
    if (currPageIndex <= 3)
      this.displayPageIndex = 1;
    else if (currPageIndex >= this.totalPage - 2)
      this.displayPageIndex = this.totalPage - 4;
    else this.displayPageIndex = currPageIndex - 2;
  }
}
