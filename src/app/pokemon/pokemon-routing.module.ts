import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "./pokemon-list.component";
import { PokemonDetailComponent } from "./profile/pokemon-detail.component";
import { PokemonResolverService } from "./pokemon-resolver.service";
import { PokemonsResolverService } from "./pokemons-resolver.service";
import { PokemonAddComponent } from "./add/pokemon-add.component";

const routes: Routes = [
  {
    path: "pokedex/:id",
    component: PokemonDetailComponent,
    resolve: {
      pokemon: PokemonResolverService,
    },
  },
  {
    path: "pokedex",
    component: PokemonListComponent,
    resolve: {
      pokemons: PokemonsResolverService,
    },
  },
  {
    path: "add-pokemon",
    component: PokemonAddComponent,
  },
  { path: "", redirectTo: "pokedex", pathMatch: "full" }, // Localhost/pokedex - path base
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}