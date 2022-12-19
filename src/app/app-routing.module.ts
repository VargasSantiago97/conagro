import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargarCrearComponent } from './components/cargar-crear/cargar-crear.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { CrearRegistrosComponent } from './components/crear-registros/crear-registros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { ListaFleterosComponent } from './components/lista-fleteros/lista-fleteros.component';
import { ListaLotesComponent } from './components/lista-lotes/lista-lotes.component';
import { ListaProduccionComponent } from './components/lista-produccion/lista-produccion.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { PatentesComponent } from './components/patentes/patentes.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { VerCambiosComponent } from './components/ver-cambios/ver-cambios.component';
import { VerXlsxCrearComponent } from './components/ver-xlsx-crear/ver-xlsx-crear.component';
import { VerxlsxComponent } from './components/verxlsx/verxlsx.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'listProduccion', component: ListaProduccionComponent },
  { path: 'pruebas', component: PruebasComponent },
  { path: 'listProveedores', component: ListaProveedoresComponent },
  { path: 'listFleteros', component: ListaFleterosComponent },
  { path: 'listDestinos', component: ListaDestinosComponent },
  { path: 'listLotes', component: ListaLotesComponent },


  { path: 'cargar', component: CargarComponent },
  { path: 'verxlsx', component: VerxlsxComponent },
  { path: 'verCambios', component: VerCambiosComponent },

  { path: 'cargarCrear', component: CargarCrearComponent },
  { path: 'verXlsxCrear', component: VerXlsxCrearComponent },
  { path: 'crearRegistros', component: CrearRegistrosComponent },
  { path: 'patentes', component: PatentesComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }