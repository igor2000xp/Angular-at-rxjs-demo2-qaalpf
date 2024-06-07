import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';

export interface Country {
  country: string;
  continent: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  continentSelect = new FormControl();
  countrySelect = new FormControl();
  currentContinentSelection: string;
  currentCountrySelection: string;
  countries: Array<Country>;
  continentSelection$: Observable<string>;
  currentContinent: string;

  constructor(private http: HttpClient) {
    http
      .get<Country[]>(
        'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json'
      )
      .subscribe((data) => (this.countries = data));

    this.continentSelection$ = this.continentSelect.valueChanges.pipe(
      tap((continent) => (this.currentContinent = continent))
    );
  }
}
