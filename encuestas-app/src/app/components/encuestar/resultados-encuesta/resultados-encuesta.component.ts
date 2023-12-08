import { Component } from '@angular/core';
import { IEncuesta } from '../../IEncuesta';
import { DatosService } from '../../datos.service';
import { HttpService } from '../../http.service';
import { SocketService } from '../../socket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.css']
})
export class ResultadosEncuestaComponent {

  constructor(private datosService: DatosService, private httpService: HttpService, private socketService: SocketService){}

  pin: string = "";
  encuesta?: IEncuesta

  private subscription?: Subscription; 

  ngOnInit(){
    this.pin = this.datosService.pin;
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if(message[0] == 'encuesta') {
        this.encuesta = JSON.parse(message[1]);
      }
    });
  }
   
  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
