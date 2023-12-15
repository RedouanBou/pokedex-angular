import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonHomepageComponentComponent } from './pokemon-homepage-component.component';

describe('PokemonHomepageComponentComponent', () => {
  let component: PokemonHomepageComponentComponent;
  let fixture: ComponentFixture<PokemonHomepageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonHomepageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonHomepageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
