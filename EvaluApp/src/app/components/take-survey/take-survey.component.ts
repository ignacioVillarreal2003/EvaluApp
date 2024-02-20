import { Component } from '@angular/core';
import { ISurvey } from '../services/ISurvey';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { IQuestion } from '../services/IQuestion';
import { IOption } from '../services/IOption';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent {
  survey?: ISurvey;

  constructor(private httpService: HttpService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.httpService.getSurvey(this.dataService.pin).subscribe(
      (response) => {
        const surveyResult: ISurvey = response.survey;

        const newSurvey: ISurvey = {
          pin: surveyResult.pin,
          title: surveyResult.title,
          questions: []
        };

        surveyResult.questions.forEach((question) => {
          const newQuestion: IQuestion = {
            title: question.title,
            options: []
          };

          question.options.forEach((option) => {
            const newOption: IOption = {
              rating: 0,
              title: option.title
            };
            newQuestion.options.push(newOption);
          });

          newSurvey.questions.push(newQuestion);
        });

        this.survey = newSurvey;
        console.log(this.survey);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addRating(question: IQuestion, optionIndex: number, event: any) {
    const isChecked = event.target.checked;
    question.options[optionIndex].rating = isChecked ? 1 : 0;
  }

  async submitSurveyResults() {
    const confirmed = await this.controlConfirmation();
    if (confirmed) {
      if (this.survey) {
        console.log(this.survey);
        this.httpService.submitSurveyResults(this.survey).subscribe(
          (response) => {
            this.router.navigate(['/endSurvey']);
          },
          (error) => {
            this.controlError(error)
          }
        );
      } else {
        this.controlError("Something went wrong.")
      }
    }
  }

  controlError(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  async controlConfirmation() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !"
    });
    if (result.isConfirmed) {
      return true;
    }
    return false;
  }
}
