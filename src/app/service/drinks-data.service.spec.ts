import { DrinksList } from './../interfaces/drinks-list';
import { DrinkDataService } from './drinks-data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
drinks : [{foo: 'bar'}],
ingredients : [{foo: 'bar'}]
};
service.getCocktails()
.subscribe(data =>
expect(data).toEqual(testData)
);
});
});
