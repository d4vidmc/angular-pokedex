import { Component } from "@angular/core";
import { dataPokemons, getPokemonImageUri } from "./mockdata";

type PokemonType = {
    name: string,
    url: string,
    id: number,
}

@Component({
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.less']
})

export class PokemonListComponent {
    pokemons: PokemonType[] = [];
    private pokemonList: PokemonType[] = [];

    constructor () {
        this.pokemonList = dataPokemons.results.map(this.normalizedPokemonItem);
        this.pokemons = this.pokemonList;
    }
    private normalizedPokemonItem(pokemon: { name: string, url: string}, index : number) : PokemonType {
    return ({
        ...pokemon,
        id: index + 1
    })
    }

    getImageUrl(pokemon: PokemonType){
        return getPokemonImageUri(pokemon.id)
    }
    
}
