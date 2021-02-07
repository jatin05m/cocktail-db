import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDrinkListComponent } from './cocktail-drink-list.component';

describe('CocktailDrinkListComponent', () => {
  let component: CocktailDrinkListComponent;
  let fixture: ComponentFixture<CocktailDrinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocktailDrinkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
