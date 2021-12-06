import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { pokemonColorMap } from "./pokemonColorHash";
import { Generation, Pokemon } from "../utils/types";
import { PokemonService } from "./pokemon.service";

@Component({
  selector: "pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.less"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  generations: Generation[] = [];
  private pokemonList: Pokemon[] = [];
  search: string = "";
  offset: number = 0;
  limit: number = 10;
  generationSelected = "";
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
    this.getGenerations();
    this.pokemonList = this.pokemons;
  }

  getPokemons() {
    this.pokemonService
      .getPokemonList(this.offset, this.limit)
      .subscribe((data: { results: Pokemon[] }) => {
        this.pokemons = data.results;
        this.pokemonList = this.pokemons;
        this.orderPokemonByName();
      });
  }
  getGenerations() {
    this.pokemonService
      .getPokemonGeneration()
      .subscribe(
        (data: { results: Generation[] }) => (this.generations = data.results)
      );
  }
  getPokemonsByGeneration(url: string) {
    this.pokemonService
      .getPokemonsByGeneration(url)
      .subscribe((data: { pokemon_species: Pokemon[] }) => {
        this.pokemons = data.pokemon_species;
        this.pokemonList = this.pokemons;
        this.orderPokemonByName();
      });
  }

  getImageUri(pokemon: Pokemon) {
    return this.pokemonService.getPokemonImageUri(
      this.getPokemonIdFromUrl(pokemon.url)
    ); // convierte en string
  }

  getPokemonColor(pokemon: Pokemon) {
    const id = this.getPokemonIdFromUrl(pokemon.url);
    return pokemonColorMap[id];
  }

  getPokemonIdFromUrl(url: string) {
    const parseUrl = url.split("/"),
      id = parseUrl[parseUrl.length - 2];
    return +id;
  }

  getTextColor(pokemon: Pokemon) {
    const pokemonColor = this.getPokemonColor(pokemon);
    switch (pokemonColor) {
      case "#fbf6f6":
      case "#f0f060e6":
        return "black";
      default:
        return "white";
    }
  }
  nextPokemons(pageItems: number): void {
    this.offset += pageItems;
    this.getPokemons();
  }

  searchPokemons() {
    this.pokemons = this.pokemonList.filter(
      (item) => !item.name.indexOf(this.search)
    );
  }

  orderPokemonByName() {
    return this.pokemons.sort((currentPokemon, nextPokemon) => {
      const currentPokemonUpperCase = currentPokemon.name.trim().toUpperCase();
      const nextPokemonUpperCase = nextPokemon.name.trim().toUpperCase();
      // < 0 sort current before next
      if (currentPokemonUpperCase < nextPokemonUpperCase) return -1;
      // > 0 sort next before current
      if (currentPokemonUpperCase > nextPokemonUpperCase) return 1;
      // === 0 no change
      return 0;
    });
  }
  onGenerationChange(generationUrl: string) {
    this.generationSelected = generationUrl;
    this.getPokemonsByGeneration(generationUrl);
  }
}
