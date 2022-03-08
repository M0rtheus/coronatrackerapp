
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryCaseService } from '../country-case.service';
import { CountryCase } from '../countrycases';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public allCases: CountryCase[];
  public bool: boolean = false;
  public totalCases: number;

  constructor(private countryCaseService: CountryCaseService){}

  ngOnInit(): void {
    this.getCountryCases();
  }

  public searchCountry(key: string):void{
    const results: CountryCase[] = [];
    for (const country of this.allCases){
      if (country.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || country.province.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(country);
      }
    }
    this.allCases = results;
    if (results.length === 0 || !key){
      this.getCountryCases();
    }
  }

  public getTotalCases(): void{
    let result: number = 0;
    if (this.allCases){
      for (const item of this.allCases){
        result += item.latestTotal;
      }
    }
    this.totalCases = result;
  }

  public getCountryCases(): void{
    this.countryCaseService.getAllCases().subscribe(
      (response: CountryCase[]) => {
        this.allCases = response;
        if (this.bool === false){
          this.getTotalCases();
          this.bool = true;
        }
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }
}

