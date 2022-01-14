import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Pokemon } from "../utils/types";
import { PokemonService } from "./pokemon.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { filter, map, pairwise, throttleTime } from "rxjs";

@Component({
  selector: "pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.less"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  pokemons: Pokemon[] = [];
  private pokemonList: Pokemon[] = [];
  search: string = "";
  offset: number = 0;
  limit: number = 10;
  generationSelected = "";
  @ViewChild("scroller") scroller?: CdkVirtualScrollViewport;

  constructor(
    private pokemonService: PokemonService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.pokemons = this.activateRouter.snapshot.data["pokemons"].results;
    //orderPokemonByName(this.pokemons);
    this.pokemonList = this.pokemons;
  }

  ngAfterViewInit(): void {
    this.scroller
      ?.elementScrolled()
      .pipe(
        map(() => this.scroller?.measureScrollOffset("bottom")),
        pairwise(), // [1,2,3,4] => [1,2] [3,4]
        filter(([y1, y2]) => {
          return y2! < y1! && y2! < 200;
        }),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.getPokemons();
        });
      });
  }

  getPokemons() {
    this.offset += this.limit;
    this.pokemonService
      .getPokemonList(this.offset, this.limit)
      .subscribe((data: { results: Pokemon[] }) => {
        this.pokemons = [...this.pokemons, ...data.results];
        //orderPokemonByName(this.pokemons);
        this.pokemonList = this.pokemons;
      });
  }

  addPokemon() {
    this.router.navigate(["add-pokemon"]);
  }

  displayByGeneration(pokemons: Pokemon[]) {
    this.pokemons = pokemons;
  }

  nextPokemons(): void {
    this.getPokemons();
  }

  searchPokemons() {
    this.pokemons = this.pokemonList.filter(
      (item) => !item.name.indexOf(this.search)
    );
  }
  updatePokemonLimit() {
    this.getPokemons();
  }
}
