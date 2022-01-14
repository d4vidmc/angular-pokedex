import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PokemonCardComponent } from "./pokemon-card.component";

let MockPokemonRouter: Partial<Router>;
const imageUrl =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";

describe("Pokemon card test", () => {
  let component: PokemonCardComponent,
    fixture: ComponentFixture<PokemonCardComponent>,
    router: Router,
    p: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      providers: [{ provide: Router, useValue: MockPokemonRouter }],
    });
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.pokemon = {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    p = fixture.nativeElement.querySelector("p");
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should get image", () => {
    //expect(component.getImageUri()).toBe(imageUrl);
  });

  it("should get imge src", () => {
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement,
      imagecss = element.query(By.css("img")),
      img: HTMLElement = imagecss.nativeElement;
    expect(img.getAttribute("src")).toEqual(imageUrl);
  });

  it("should find the <a> before load data", () => {
    fixture.detectChanges();
    expect(p.textContent).toContain("Bulbasaur");
  });
});
