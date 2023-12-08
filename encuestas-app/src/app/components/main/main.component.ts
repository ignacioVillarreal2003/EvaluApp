import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private httpService: HttpService, private router: Router, private datosService: DatosService){}

  pin: string = "";

  ingresarEncuesta(){    
    if (this.pin !== ""){
      this.httpService.checkPin(this.pin).subscribe(
        (response) => {
          this.datosService.pinUsuario = this.pin;
          this.router.navigate(['/hacerEncuesta']);
          console.log(response.message);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
