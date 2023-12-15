import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonHeaderComponentComponent } from './pokemon-header-component.component';

describe('PokemonHeaderComponentComponent', () => {
  let component: PokemonHeaderComponentComponent;
  let fixture: ComponentFixture<PokemonHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonHeaderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
