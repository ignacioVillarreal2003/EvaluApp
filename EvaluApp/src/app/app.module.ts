import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';
import { TakeSurveyComponent } from './components/take-survey/take-survey.component';
import { SurveyEndComponent } from './components/survey-end/survey-end.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateSurveyComponent,
    SurveyResultsComponent,
    TakeSurveyComponent,
    SurveyEndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
