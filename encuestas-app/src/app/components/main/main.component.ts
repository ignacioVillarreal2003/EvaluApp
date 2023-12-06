import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private httpService: HttpService, private router: Router){}

  pin: string = "";

  ingresarEncuesta(){    
    if (this.pin !== ""){
      this.httpService.checkPin(this.pin).subscribe(
        (response) => {
          this.router.navigate(['/encuesta']);
          console.log(response.message);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
