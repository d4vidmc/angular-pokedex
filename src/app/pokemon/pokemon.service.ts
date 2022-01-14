import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pokemon, PokemonDetail, PokemonSpecies } from "../utils/types";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 25) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    ) as Observable<{ results: Pokemon[] }>;
  }

  getPokemon(id: string) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ) as Observable<PokemonDetail>;
  }

  getPokemonImageUri(id: number) {
    const imageId = ("00" + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
  }
  getGeneration() {
    return this.http.get(
      "https://pokeapi.co/api/v2/generation/"
    ) as Observable<{ results: { name: string; url: string }[] }>;
  }
  getGenerationById(url: string) {
    return this.http.get(url) as Observable<{ pokemon_species: Pokemon[] }>;
  }
  getPokemonSpecies(id: string) {
    return this.http.get("https://pokeapi.co/api/v2/pokemon-species/" + id)  as Observable<PokemonSpecies>;;
  }
  getLanguage() {
    return this.http.get("https://pokeapi.co/api/v2/language") as Observable<{
      results: { name: string; url: string }[];
    }>;
  }
  getPokemonChain(url: string) {
    console.log("URL:", url);
    return this.http.get(url) as Observable<{
      results: { name: string; url: string }[];
    }>;
  }
}
