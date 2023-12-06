import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { IPregunta } from '../IPregunta';
import { IEncuesta } from '../IEncuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  encuesta: IEncuesta | null = null;
  tituloEncuesta: string = "";
  pin: string = "";
  listaPreguntas: IPregunta[] = [];

  tituloPregunta: string = "";
  opcionesPregunta: string[] = [];

  agregarOpcion() {
    this.opcionesPregunta.push("");
  }

  agregarPregunta(){
    this.listaPreguntas.push({
      titulo: this.tituloPregunta,
      opciones: this.opcionesPregunta
    })
    this.opcionesPregunta = [];
    this.tituloPregunta = "";
  }

  subirEncuesta(){    
    this.pin = this.generarPin();
    this.encuesta = {
      titulo: this.tituloEncuesta,
      preguntas: this.listaPreguntas,
      pin: this.pin
    }
    // ruteo y llamada al servidor
  }


  generarPin(): string {
    let numerosAleatorios = '';
    for (let i = 0; i < 6; i++) {
      numerosAleatorios += Math.floor(Math.random() * 10);
    }
    return numerosAleatorios;
  }


  
}
