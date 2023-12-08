import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { EncuestaComponent } from './components/encuestar/encuesta/encuesta.component';
import { UsuarioComponent } from './components/encuestado/usuario/usuario.component';
import { ResultadosEncuestaComponent } from './components/encuestar/resultados-encuesta/resultados-encuesta.component';
import { FinEncuestaComponent } from './components/encuestado/fin-encuesta/fin-encuesta.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'resultadosEncuesta', component: ResultadosEncuestaComponent },
  { path: 'hacerEncuesta', component: UsuarioComponent },
  { path: 'finEncuesta', component: FinEncuestaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
