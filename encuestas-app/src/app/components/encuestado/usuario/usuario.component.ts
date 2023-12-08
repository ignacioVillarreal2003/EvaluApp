import { Component } from '@angular/core';
import { IEncuesta } from '../../IEncuesta';
import { HttpService } from '../../http.service';
import { DatosService } from '../../datos.service';
import { Router } from '@angular/router';
import { IPregunta } from '../../IPregunta';
import { IOpcion } from '../../IOpcion';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  constructor(private httpService: HttpService, private datosService: DatosService, private router: Router){}

  encuesta?: IEncuesta

  ngOnInit(){
    this.httpService.getEncuesta(this.datosService.pinUsuario).subscribe(
      (response) => {
        const encuestaResult: IEncuesta = response.encuesta;
        
        const nuevaEncuesta: IEncuesta = {
          pin: encuestaResult.pin,
          titulo: encuestaResult.titulo,
          preguntas: []
        }
        encuestaResult.preguntas.forEach((e) => {
          let nuevaPregunta: IPregunta = {
            titulo: e.titulo,
            opciones: []
          }
          e.opciones.forEach((e) => {
            let nuevaOpcion: IOpcion = {
              calificacion: 0,
              titulo: e.titulo
            }
            nuevaPregunta.opciones.push(nuevaOpcion);
          })
          nuevaEncuesta.preguntas.push(nuevaPregunta)
        })
        
        this.encuesta = nuevaEncuesta;
        console.log(this.encuesta);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sumarCalificacion(pregunta: any, opcionIndex: number, event: any) {
    const estaCheckeado = event.target.checked; 
    if (estaCheckeado){
      pregunta.opciones[opcionIndex].calificacion = 1;
    } else {
      pregunta.opciones[opcionIndex].calificacion = 0;
    }
  }

  subirResultadosEncuesta(){
    if (this.encuesta !== undefined){
      console.log(this.encuesta);
      this.httpService.subirResultadosEncuesta(this.encuesta).subscribe(
        (response) => {
          this.router.navigate(['/finEncuesta']);
          console.log(response.message);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

}
