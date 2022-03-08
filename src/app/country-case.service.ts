import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryCase } from './countrycases';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryCaseService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  

  public getAllCases(): Observable<CountryCase[]> {
    return this.http.get<CountryCase[]>(`${this.apiServerUrl}/all`);
  }

  public getCountryCases(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/countrycase/${id}`);
  }

  public getCountry(id: number): Observable<CountryCase>{
    return this.http.get<CountryCase>(`${this.apiServerUrl}/find/${id}`);
  }

}
