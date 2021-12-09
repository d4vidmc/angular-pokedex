import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "./pokemon-list.component";
import { PokemonDetailComponent } from "./profile/pokemon-detail.component";

const routes: Routes = [
  { path: "pokedex/:id", component: PokemonDetailComponent },
  { path: "pokedex", component: PokemonListComponent },
  { path: "", redirectTo: "/pokedex", pathMatch: "full" }, // Localhost/pokedex - path base
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class PokemonRoutingModule {}
