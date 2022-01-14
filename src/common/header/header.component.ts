import { Component, OnInit } from "@angular/core";
import { StyleManagerService } from "./style-manager.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export class HeaderComponent implements OnInit {
  options = [
    {
      label: "Deep Purple & Amber",
      value: "deeppurple-amber",
    },
    {
      label: "Indigo & Pink",
      value: "indigo-pink",
    },
    {
      label: "Pink & Blue Grey",
      value: "pink-bluegrey",
    },
    {
      label: "Purple & Green",
      value: "purple-green",
    },
  ];
  constructor(private themeService: StyleManagerService) {}

  ngOnInit(): void {
    this.themeService.setStyle("purple-green");
  }
  themeChangeHandler(theme: any) {
    this.themeService.setStyle(theme);
  }
}
