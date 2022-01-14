import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PokemonDetail, PokemonSpecies } from "src/app/utils/types";
import { PokemonService } from "../pokemon.service";
import { pokemonTypeColorMap } from "../pokemonColorHash";
import { pokemonImageHash } from "../pokemonGameImgHash";
import { getPokemonIdFromUrl } from "../pokemon-helper";

@Component({
  selector: "pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["pokemon-detail.component.less"],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  id: string = "1";
  pokemonDetail?: PokemonDetail;
  pokemonSpecies?: PokemonSpecies;
  pokemonChain?: any;
  gameDescriptions?: any;
  language: string = "en";
  pokemonSpeciesSubscription?: Subscription;
  pokemonDetailSubscription?: Subscription;
  pokemonChainSubscription?: Subscription;
  // without a constructor, it doesn't build (blank page)
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || "1";
    this.pokemonDetailSubscription = this.pokemonService
      .getPokemon(this.id)
      .subscribe((pokemonDetail) => {
        this.pokemonDetail = pokemonDetail;
      });

    this.pokemonSpeciesSubscription = this.pokemonService
      .getPokemonSpecies(this.id)
      .subscribe((pokemonSpecies) => {
        this.pokemonSpecies = pokemonSpecies;
        this.gameDescriptions =
          this.filterDescriptionByLanguage(pokemonSpecies);
          this.pokemonChainSubscription = this.pokemonService
            .getPokemonChain(this.pokemonSpecies.evolution_chain.url)
            .subscribe((pokemonChain) => {
              this.pokemonChain = pokemonChain;
            });
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
  goHome() {
    this.router.navigate(["pokedex"]);
  }

  getStatEffortColor(effortNumber: number): string {
    return effortNumber ? "rgb(93, 153, 113)" : "inherit";
  }

  getImageUriById(url: string) {
    let id = 1;
    if (url != undefined) id = Number(url.slice(0, -1).split("/").pop());
    return this.pokemonService.getPokemonImageUri(id);
  }

  goToPokemonDetails(pokemonDetail: any) {
    console.log(pokemonDetail);
    const id = getPokemonIdFromUrl(pokemonDetail.url);
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([`./pokedex/${id}/`]));
  }
}
