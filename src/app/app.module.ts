import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//PRIMENG
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BadgeModule} from 'primeng/badge';
import {TagModule} from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';

import { InicioComponent } from './components/inicio/inicio.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { ListaProduccionComponent } from './components/lista-produccion/lista-produccion.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { ListaFleterosComponent } from './components/lista-fleteros/lista-fleteros.component';
import { VerxlsxComponent } from './components/verxlsx/verxlsx.component';
import { VerCambiosComponent } from './components/ver-cambios/ver-cambios.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { ListaLotesComponent } from './components/lista-lotes/lista-lotes.component';
import { CargarCrearComponent } from './components/cargar-crear/cargar-crear.component';
import { VerXlsxCrearComponent } from './components/ver-xlsx-crear/ver-xlsx-crear.component';
import { CrearRegistrosComponent } from './components/crear-registros/crear-registros.component';
import { FormsModule } from '@angular/forms';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { PatentesComponent } from './components/patentes/patentes.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CargarComponent,
    ListaProduccionComponent,
    ListaProveedoresComponent,
    ListaFleterosComponent,
    VerxlsxComponent,
    VerCambiosComponent,
    ListaDestinosComponent,
    ListaLotesComponent,
    CargarCrearComponent,
    VerXlsxCrearComponent,
    CrearRegistrosComponent,
    PruebasComponent,
    PatentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,


    //PRIMENG
    ButtonModule,
    MenubarModule,
    TableModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    BadgeModule,
    TagModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
