import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PokemonModule } from "./pokemon/pokemon.module";

@NgModule({
  declarations: [AppComponent],
  imports: [PokemonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
