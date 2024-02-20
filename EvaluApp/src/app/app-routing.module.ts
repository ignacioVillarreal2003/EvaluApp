import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';
import { TakeSurveyComponent } from './components/take-survey/take-survey.component';
import { SurveyEndComponent } from './components/survey-end/survey-end.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'survey', component: CreateSurveyComponent },
  { path: 'surveyResults', component: SurveyResultsComponent },
  { path: 'takeSurvey', component: TakeSurveyComponent },
  { path: 'endSurvey', component: SurveyEndComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
