import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { IPregunta } from '../../IPregunta';
import { IEncuesta } from '../../IEncuesta';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { DatosService } from '../../datos.service';
import { IOpcion } from '../../IOpcion';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router, private datosService: DatosService) { }

  formulario: FormGroup = this.formBuilder.group({
    tituloPregunta: ['', Validators.required],
    opcionesPregunta: this.formBuilder.array([this.crearOpcion()])
  });

  /* Titulo pregunta */
  get getTituloPregunta(): any {
    return this.formulario.get('tituloPregunta');
  }

  /* Opciones */
  get getOpcionesPregunta(): FormGroup[] {
    return (this.formulario.get('opcionesPregunta') as FormArray).controls as FormGroup[];
  }

  getOpcionesPreguntaValues(): string[] {
    return this.getOpcionesPregunta.map(control => control.get('texto')?.value || '');
  }

  crearOpcion(): FormGroup {
    return this.formBuilder.group({
      texto: ['', Validators.required]
    });
  }

  agregarOpcion() {
    const opcionesPreguntaControl = this.formulario.get('opcionesPregunta') as FormArray;
    opcionesPreguntaControl.push(this.crearOpcion());
  }

  encuesta: IEncuesta | null = null;
  tituloEncuesta: string = "";
  pin: string = "";
  listaPreguntas: IPregunta[] = [];

  agregarPregunta() {
    let listaOpciones = this.getOpcionesPreguntaValues();
    let listaFinalOpciones: IOpcion[] = [];
    listaOpciones.forEach(element => {
      listaFinalOpciones.push({
        titulo: element,
        calificacion: 0
      })
    });
    if (this.getTituloPregunta.value !== '' && this.getOpcionesPreguntaValues().length > 1) {
      this.listaPreguntas.push({
        titulo: this.getTituloPregunta.value,
        opciones: listaFinalOpciones
      });
      // Limpiar todas las opciones
      const opcionesPreguntaControl = this.formulario.get('opcionesPregunta') as FormArray;
      opcionesPreguntaControl.clear();

      // Agregar una nueva opción vacía
      opcionesPreguntaControl.push(this.crearOpcion());

      // Limpiar el título
      this.formulario.patchValue({
        tituloPregunta: ''
      });
    }
    console.log(this.listaPreguntas);
    
  }

  subirEncuesta() {
    this.pin = this.generarPin();
    this.datosService.pin = this.pin;
    this.encuesta = {
      titulo: this.tituloEncuesta,
      preguntas: this.listaPreguntas,
      pin: this.pin
    }
    this.httpService.subirEncuesta(this.encuesta).subscribe(
      (response) => {
        this.router.navigate(['/resultadosEncuesta']);
        console.log(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generarPin(): string {
    let numerosAleatorios = '';
    for (let i = 0; i < 6; i++) {
      numerosAleatorios += Math.floor(Math.random() * 10);
    }
    return numerosAleatorios;
  }

}
