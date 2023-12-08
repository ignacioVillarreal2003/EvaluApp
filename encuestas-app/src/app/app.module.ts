import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncuestaComponent } from './components/encuestar/encuesta/encuesta.component';
import { UsuarioComponent } from './components/encuestado/usuario/usuario.component';
import { MainComponent } from './components/main/main.component';
import { ResultadosEncuestaComponent } from './components/encuestar/resultados-encuesta/resultados-encuesta.component';
import { FinEncuestaComponent } from './components/encuestado/fin-encuesta/fin-encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    EncuestaComponent,
    UsuarioComponent,
    MainComponent,
    ResultadosEncuestaComponent,
    FinEncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
