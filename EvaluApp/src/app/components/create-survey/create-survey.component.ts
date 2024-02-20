import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IQuestion } from '../services/IQuestion';
import { ISurvey } from '../services/ISurvey';
import { IOption } from '../services/IOption';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent {

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService
  ) { }

  survey: ISurvey | null = null;

  surveyTitle: string = '';
  pin: string = '';
  questionList: IQuestion[] = [];

  form: FormGroup = this.formBuilder.group({
    questionTitle: ['', Validators.required],
    questionOptions: this.formBuilder.array([this.createOption()])
  });

  /* Question Title */
  get getQuestionTitle(): any {
    return this.form.get('questionTitle');
  }

  /* Options */
  get getQuestionOptions(): FormGroup[] {
    return (this.form.get('questionOptions') as FormArray).controls as FormGroup[];
  }

  getQuestionOptionsValues(): string[] {
    return this.getQuestionOptions.map(control => control.get('text')?.value || '');
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  addOption() {
    const questionOptionsControl = this.form.get('questionOptions') as FormArray;
    questionOptionsControl.push(this.createOption());
  }

  /* Questions */
  addQuestion() {
    let optionsList = this.getQuestionOptionsValues();
    let finalOptionsList: IOption[] = [];
    optionsList.forEach(element => {
      finalOptionsList.push({
        title: element,
        rating: 0
      });
    });

    if (this.getQuestionTitle.value !== '' && this.getQuestionOptionsValues().length > 1) {
      this.questionList.push({
        title: this.getQuestionTitle.value,
        options: finalOptionsList
      });

      // Clear all options
      const questionOptionsControl = this.form.get('questionOptions') as FormArray;
      questionOptionsControl.clear();

      // Add a new empty option
      questionOptionsControl.push(this.createOption());

      // Clear the title
      this.form.patchValue({
        questionTitle: ''
      });
    }
  }

  async publishSurvey() {
    const confirmed = await this.controlConfirmation();
    if (confirmed) {
      this.pin = this.generatePin();
      if (this.checkData()) {
        this.dataService.pin = this.pin;
        this.survey = {
          title: this.surveyTitle,
          questions: this.questionList,
          pin: this.pin
        };
        this.httpService.publishSurvey(this.survey).subscribe(
          (response) => {
            this.router.navigate(['/surveyResults']);
          },
          (error) => {
            this.controlError(error);
          }
        );
      }
    }
  }

  generatePin(): string {
    let randomNumbers = '';
    for (let i = 0; i < 6; i++) {
      randomNumbers += Math.floor(Math.random() * 10);
    }
    return randomNumbers;
  }

  checkData() {
    if (this.surveyTitle.length === 0) {
      this.controlError("Error in the title.")
      return false;
    }
    if (this.questionList.length === 0) {
      this.controlError("Error in the questions.")
      return false;
    }
    if (this.pin.length !== 6) {
      this.controlError("Error in the pin.")
      return false;
    }
    return true;
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

