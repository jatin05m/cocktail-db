import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormValuesService } from '../service/form-values.service';
import { DrinkDataService } from '../service/drinks-data.service';
import { concatAll, map, mergeMap, takeUntil, tap, filter } from 'rxjs/operators';
import { ContentData } from '../interfaces/content-data';
import { Observable, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from './../service/loader.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
})

export class ContentComponent implements AfterViewInit, OnDestroy {
    public cocktails: ContentData[][] = [];
    public currentPage!: ContentData[][];
    cocktailData: any
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.cocktails);
    public paginatorLength!: number;
    public paginatorPageIndex!: number;

    private onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private formValuesService: FormValuesService,
        private drinksService: DrinkDataService,
        public loaderService: LoaderService,
    ) { }

    ngAfterViewInit(): void {
        this.getValues().subscribe(categories => {
            this.cocktails = [...this.cocktails, categories];
            this.setPaginatorData();
        });
    }

    ngOnInit(): void {
        this.getAllDrinks()

    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    getAllDrinks() {
        this.drinksService
            .getCocktails()
            .subscribe((response) => {
                this.cocktailData = response.drinks;
                console.log(this.cocktailData)
            });
    }

    getValues(): Observable<ContentData[]> {
        return this.formValuesService.getValue()
            .pipe(
                tap(() => this.cocktails = []),
                tap(() => !!this.paginator ? this.paginator.firstPage() : null),
                filter(formValues => !!formValues),
                map(formValues => Object.entries(formValues)
                    .map((el: { [index: string]: any }) => el[0] = { title: el[0], display: el[1] })
                    .filter(category => category.display === true)
                ),
                mergeMap(categories => categories.map(category => this.drinksService.getContentItems(category.title)
                    .pipe(
                        map(cocktails => [{ ...category, data: cocktails }]),
                    )
                )),
                concatAll(),
                takeUntil(this.onDestroy),
            );
    }

    setPaginatorData(): void {
        this.dataSource.paginator = this.paginator;
        this.paginatorLength = this.cocktails.length;
        this.currentPage = this.cocktails.slice(0, 1);
    }

    OnPageChange(event: PageEvent): void {
        const paginatorStartIndex = event.pageIndex;
        let paginatorEndIndex = paginatorStartIndex + event.pageSize;
        if (paginatorEndIndex > this.paginatorLength) {
            paginatorEndIndex = this.paginatorLength;
        }
        this.paginatorPageIndex = event.pageIndex;
        this.currentPage = this.cocktails.slice(paginatorStartIndex, paginatorEndIndex);
    }
}