import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountryCaseService } from './country-case.service';
import { FormsModule } from '@angular/forms';
import { CountryComponent } from './country/country.component';
import { RouterModule, UrlSegment } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'country/:id', component: CountryComponent}
    ])
  ],
  providers: [CountryCaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
