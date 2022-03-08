import { Component, OnInit } from '@angular/core';
import { CountryCaseService } from '../country-case.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CountryCase } from '../countrycases';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

  public countryCases:  Map<string, number>;
  public dates: string[] = [];
  public values: number[] = [];
  public country: CountryCase;
  public options: any;

  constructor(private countryCaseService: CountryCaseService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.paramMap
    .subscribe(params =>{
      let id: number = Number(params.get('id'));
      this.getCountryCases(id);
      this.getCountry(id);
    });
  }

  public drawChart(): void{
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    this.options = {
      tooltip: {},
      xAxis: {
        data: this.dates,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: this.values
        },
      ],
      animationEasing: 'elasticOut'
    };
  }

  public getCountryCases(id: number): void{
    this.countryCaseService.getCountryCases(id).subscribe(
      (response) => {
        for (const item of Object.entries(response)){
          this.dates.push(item[0]);
          this.values.push(Number(item[1]));
        }
        this.drawChart();
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }

  public getCountry(id: number): void{
    this.countryCaseService.getCountry(id).subscribe(
      (response) => {
        this.country = response;
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }

}