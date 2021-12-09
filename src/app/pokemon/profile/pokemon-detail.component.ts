import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { PokemonDetail, pokemonSpecies } from "src/app/utils/types";
import { PokemonService } from "../pokemon.service";
import { pokemonTypeColorMap } from "../pokemonColorHash";
import { pokemonImageHash } from "../pokemonGameImgHash";

@Component({
  selector: "pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["pokemon-detail.component.less"],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  id: string = "1";
  pokemonDetail?: PokemonDetail;
  pokemonSpecies?: pokemonSpecies;
  gameDescriptions?: any;
  language: string = "en";
  pokemonSpeciesSubscription?: Subscription;
  pokemonDetailSubscription?: Subscription;
  // without a constructor, it doesn't build (blank page)
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || "1";
    this.pokemonDetailSubscription = this.pokemonService
      .getPokemon(this.id)
      .subscribe((pokemonDetail) => {
        this.pokemonDetail = pokemonDetail;
        console.log(pokemonDetail);
      });

    this.pokemonSpeciesSubscription = this.pokemonService
      .getPokemonSpecies(this.id)
      .subscribe((pokemonSpecies) => {
        this.pokemonSpecies = pokemonSpecies;
        this.gameDescriptions =
          this.filterDescriptionByLanguage(pokemonSpecies);
      });
  }
  ngOnDestroy() {
    this.pokemonDetailSubscription?.unsubscribe();
    this.pokemonSpeciesSubscription?.unsubscribe();
  }

  refreshDescriptions() {
    this.gameDescriptions = this.filterDescriptionByLanguage(
      this.pokemonSpecies
    );
  }

  filterDescriptionByLanguage(species: any) {
    return species.flavor_text_entries.filter(
      (item: any) => item.language.name === this.language
    );
  }

  getNameByLanguage(names: any[]) {
    const found = names.find(
      (item: any) => item.language.name === this.language
    );
    return found?.name || "unknown";
  }

  getGameImage(name: string) {
    return pokemonImageHash[name];
  }

  getColorByType(type: string) {
    return pokemonTypeColorMap[type];
  }
  getImageUri() {
    // id should be integer
    return this.pokemonService.getPokemonImageUri(+this.id);
  }
  goBack() {
    this.location.back();
  }

  getStatEffortColor(effortNumber: number): string {
    return effortNumber? "rgb(93, 153, 113)" : "rgb(100, 100, 100)";
  }
}
