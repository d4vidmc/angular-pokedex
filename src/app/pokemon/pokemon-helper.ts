import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Pokemon } from "../utils/types";

export function getPokemonIdFromUrl(url: string) {
  const parseUrl = url.split("/"),
    id = parseUrl[parseUrl.length - 2];
  return +id;
}

export function orderPokemonByName(pokemons: Pokemon[]) {
  return pokemons.sort(function (a, b) {
    var pokemonA = a.name.toUpperCase();
    var pokemonB = b.name.toUpperCase();
    return pokemonA < pokemonB ? -1 : pokemonA > pokemonB ? 1 : 0;
  });
}

export function forbiddenNameValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regex.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
