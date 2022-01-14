import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { PokemonListComponent } from "./pokemon-list.component";
import { NotFoundComponent } from "../../common/not-found.component";
import { PokemonDetailComponent } from "./profile/pokemon-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { PokemonRoutingModule } from "./pokemon-routing.module";
import { PokemonCardComponent } from "./pokemon-card.component";
import { PokemonGenerationComponent } from "./pokemon-generation.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuComponent } from "src/common/menu/menu.component";
import { HeaderComponent } from "src/common/header/header.component";
// Angular Material
import { MatSliderModule } from "@angular/material/slider";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { StyleManagerService } from "src/common/header/style-manager.service";
import { PokemonAddComponent } from "./add/pokemon-add.component";

const materialModule = [
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,
    PokemonDetailComponent,
    PokemonCardComponent,
    PokemonGenerationComponent,
    PokemonAddComponent,
    MenuComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ReactiveFormsModule,
    ...materialModule,
  ],
  // Available in app and could be used in other parts of the app
  exports: [PokemonRoutingModule, MenuComponent, HeaderComponent],
  providers: [StyleManagerService],
  bootstrap: [],
})
export class PokemonModule {}
