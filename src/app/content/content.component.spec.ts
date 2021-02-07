import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormValuesService } from '../service/form-values.service';
import { DrinkDataService } from '../service/drinks-data.service';
import { LoaderService } from './../service/loader.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let formValuesService: FormValuesService;
  let drinksService: DrinkDataService;
  let loaderService: LoaderService;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ContentComponent]
  //   })
  //     .compileComponents();
  // });


  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatGridListModule,
        MatPaginatorModule,
        MatTableModule,
        MatDividerModule,
        MatProgressSpinnerModule
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ContentComponent],
      providers:[FormValuesService, DrinkDataService, LoaderService]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
