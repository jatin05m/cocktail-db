import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDrinkListComponent } from './cocktail-drink-list.component';
import { FormValuesService } from './../service/form-values.service';
import { DrinkDataService } from './../service/drinks-data.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CocktailDrinkListComponent', () => {
  let component: CocktailDrinkListComponent;
  let fixture: ComponentFixture<CocktailDrinkListComponent>;
  let formValuesService: FormValuesService;
  let drinksService: DrinkDataService;


  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CocktailDrinkListComponent],
      providers:[FormValuesService, DrinkDataService]
    }).compileComponents();
    drinksService = TestBed.get(DrinkDataService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service: DrinkDataService = TestBed.inject(DrinkDataService);
    expect(service).toBeTruthy();
  });

  it('should get drinks on category', () => {
    let response ={
      "strCategory":"Alcholic"
    }
    let service = TestBed.inject(DrinkDataService)
    expect(service.getFilterItems).toBeTruthy(response);

  });
});
