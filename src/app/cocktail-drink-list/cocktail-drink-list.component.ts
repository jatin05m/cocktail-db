import { LoaderService } from './../service/loader.service';
import { FormValuesService } from './../service/form-values.service';
import { FilterItem } from './../interfaces/filter-item';
import { DrinkDataService } from './../service/drinks-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';


@Component({
    selector: 'app-cocktail-drink-list',
    templateUrl: './cocktail-drink-list.component.html',
    styleUrls: ['./cocktail-drink-list.component.css']
})
export class CocktailDrinkListComponent implements OnInit {
    cocktailData: any;
    public filtersForm: FormGroup = this.formBuilder.group({});
    public headings: Observable<Array<FilterItem>> | undefined;
    private onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private drinksService: DrinkDataService,
        private formBuilder: FormBuilder,
        private formValuesService: FormValuesService,
        private loaderService: LoaderService,

    ) { }

    ngOnInit(): void {
        this.headings = this.drinksService.getFilterItems();
        this.createForm().subscribe();
    }


    createForm(): Observable<FilterItem[]> {
        return this.drinksService.getFilterItems()
            .pipe(
                filter(drinks => !!drinks),
                tap(drinks => drinks.map((drink: { strCategory: string; }) => this.filtersForm.addControl(drink.strCategory, this.formBuilder.control(true)))),
                takeUntil(this.onDestroy),
            );
    }
    submitForm(): void {
        this.formValuesService.setValue(this.filtersForm.value);
        this.loaderService.showSpinner();
    }

}