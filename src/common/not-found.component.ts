import { Component } from "@angular/core";

@Component({
  selector: "not-found",
  template: ` <div class="not-found">
    <h2>No Pokemons to display</h2>
    <img [src]="url" />
  </div>`,
  styleUrls: ["./not-found.component.less"],
})
export class NotFoundComponent {
  url: string = "assets/not-found.png";
}
