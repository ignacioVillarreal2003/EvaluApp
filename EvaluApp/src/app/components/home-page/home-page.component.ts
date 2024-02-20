import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private httpService: HttpService, private router: Router, private dataService: DataService) { }

  pin: string = "";

  joinSurvey() {
    if (this.pinVerification()){
      if (this.pin !== "") {
        this.httpService.checkPin(this.pin).subscribe(
          (response) => {
            this.dataService.pin = this.pin;
            this.router.navigate(['/takeSurvey']);
          },
          (error) => {
            this.controlError(error);
          }
        );
      }
    } 
  }

  pinVerification(){
    if (this.pin.length == 6){
      return true;
    } 
    this.controlError("Check the pin.");
    return false;
  }

  controlError(message: string){
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
}
