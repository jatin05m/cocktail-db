import { DrinksList } from './../interfaces/drinks-list';
import { ContentItem } from './../interfaces/content-item';
import { FilterItem } from './../interfaces/filter-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DrinkDataService {
    private drinks = 'drinks';
    mainURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

    constructor(private http: HttpClient) { }

    public getFilterItems(): Observable<Array<FilterItem>> {
        return this.http.get<Array<FilterItem>>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').pipe(
            map(response => (response as any)[this.drinks]
            ))
    }

    getCocktails(): Observable<DrinksList> {
        return this.http.get<DrinksList>(this.mainURL);
    }

    getContentItems(drinkCategory: string): Observable<Array<ContentItem>> {
        return this.http.get<Array<ContentItem>>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`)
            .pipe(
                map(response => (response as any)[this.drinks]),
            );
    }

}
