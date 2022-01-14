import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Option } from "src/app/utils/types";

@Component({
  selector: "menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.less"],
})
export class MenuComponent {
  @Input() options!: Array<Option>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  selectTheme(theme: string) {
    this.themeChange.emit(theme);
  }
}
