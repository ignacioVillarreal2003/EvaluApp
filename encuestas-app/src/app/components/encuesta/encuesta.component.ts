import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { IPregunta } from '../IPregunta';
import { IEncuesta } from '../IEncuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  constructor(private formBuilder: FormBuilder) { }

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
    if (this.getTituloPregunta.value !== '' && this.getOpcionesPreguntaValues().length > 1) {
      this.listaPreguntas.push({
        titulo: this.getTituloPregunta.value,
        opciones: this.getOpcionesPreguntaValues()
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
  }

  subirEncuesta() {
    this.pin = this.generarPin();
    this.encuesta = {
      titulo: this.tituloEncuesta,
      preguntas: this.listaPreguntas,
      pin: this.pin
    }
    console.log(this.encuesta);

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
