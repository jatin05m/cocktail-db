import { DrinksList } from './../interfaces/drinks-list';
import { DrinkDataService } from './drinks-data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterItem } from '../interfaces/filter-item';

describe('TodoDataService', () => {
    let service: DrinkDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(DrinkDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test getCocktails', () => {
        const testData: DrinksList = {
            drinks: [{ foo: 'bar' }],
            ingredients: [{ foo: 'bar' }]
        };
        service.getCocktails()
            .subscribe(data =>
                expect(data).toEqual(testData)
            );
    });

    let ContentItem: any = {
        "strDrink": "69 special",
        "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qyyvtu1468878544.jpg",
        "idDrink": 178318,
    }
    let DrinksList: any = {
        "drinkCategory": "Alcoholic",
    }

    it('should test getFilterItems', async(done) => {
        const service: DrinkDataService = TestBed.inject(DrinkDataService)
        service.getContentItems(DrinksList).subscribe(res =>{
            expect(res).toEqual(ContentItem);
            expect(service).toHaveBeenCalled()
            done();
        })
    });
});
