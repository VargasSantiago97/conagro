import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerProduccionComponent } from './components/analizar/ver-produccion/ver-produccion.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { CargarCrearComponent } from './components/cargar-crear/cargar-crear.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { ActualizarListadoCPComponent } from './components/conagro/actualizar-listado-cp/actualizar-listado-cp.component';
import { CompararComponent } from './components/conagro/comparar/comparar.component';
import { CorredoresSinSynagroComponent } from './components/conagro/corredores-sin-synagro/corredores-sin-synagro.component';
import { DatosGeneralesCPEComponent } from './components/conagro/datos-generales-cpe/datos-generales-cpe.component';
import { ImportarDatosPDFComponent } from './components/conagro/importar-datos-pdf/importar-datos-pdf.component';
import { MovimientosProduccionResumenComponent } from './components/conagro/movimientos-produccion-resumen/movimientos-produccion-resumen.component';
import { MovimientosProduccionComponent } from './components/conagro/movimientos-produccion/movimientos-produccion.component';
import { VerListadoCPComponent } from './components/conagro/ver-listado-cp/ver-listado-cp.component';
import { CargarDescargasComponent } from './components/corredores/cargar-descargas/cargar-descargas.component';
import { CorredoresComponent } from './components/corredores/corredores/corredores.component';
import { DescargasComponent } from './components/corredores/descargas/descargas.component';
import { CrearDestinosComponent } from './components/crear-destinos/crear-destinos.component';
import { CrearRegistrosComponent } from './components/crear-registros/crear-registros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { ListaFleterosComponent } from './components/lista-fleteros/lista-fleteros.component';
import { ListaLoteActividadComponent } from './components/lista-lote-actividad/lista-lote-actividad.component';
import { ListaLotesComponent } from './components/lista-lotes/lista-lotes.component';
import { ListaProduccionComponent } from './components/lista-produccion/lista-produccion.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { PatentesComponent } from './components/patentes/patentes.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { ResumenSociosComponent } from './components/resumen-socios/resumen-socios.component';
import { VerCambiosComponent } from './components/ver-cambios/ver-cambios.component';
import { VerXlsxCrearComponent } from './components/ver-xlsx-crear/ver-xlsx-crear.component';
import { VerxlsxComponent } from './components/verxlsx/verxlsx.component';
import { CpComponent } from './components/vistas/cp/cp.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'listProduccion', component: ListaProduccionComponent },
  { path: 'pruebas', component: PruebasComponent },
  { path: 'listProveedores', component: ListaProveedoresComponent },
  { path: 'listFleteros', component: ListaFleterosComponent },
  { path: 'listDestinos', component: ListaDestinosComponent },
  { path: 'listLotes', component: ListaLotesComponent },
  { path: 'listLoteActividad', component: ListaLoteActividadComponent },

  { path: 'cargar', component: CargarComponent },
  { path: 'verxlsx', component: VerxlsxComponent },
  { path: 'verCambios', component: VerCambiosComponent },

  { path: 'cargarCrear', component: CargarCrearComponent },
  { path: 'verXlsxCrear', component: VerXlsxCrearComponent },
  { path: 'crearRegistros', component: CrearRegistrosComponent },
  { path: 'patentes', component: PatentesComponent },
  { path: 'crearDestinos', component: CrearDestinosComponent },


  { path: 'verProduccion', component: VerProduccionComponent },

  { path: 'ver/cp', component: CpComponent },

  //CONAGRO
  
  { path: 'conagro/actualizarCP', component: ActualizarListadoCPComponent },
  { path: 'conagro/verListadoCP', component: VerListadoCPComponent },
  { path: 'conagro/datosGeneralesCPE', component: DatosGeneralesCPEComponent },
  { path: 'conagro/importarPDF', component: ImportarDatosPDFComponent },
  { path: 'conagro/datosGeneralesCPE/ver/cp', component: CpComponent },

  { path: 'conagro/corredores/corredores', component: CorredoresComponent },
  { path: 'conagro/corredores/descargas', component: DescargasComponent },
  { path: 'conagro/corredores/cargar_descargas', component: CargarDescargasComponent },
  { path: 'conagro/corredoresSinSynagro', component: CorredoresSinSynagroComponent },

  
  { path: 'conagro/comparar', component: CompararComponent },

  { path: 'conagro/movimientosProduccion', component: MovimientosProduccionComponent },
  { path: 'conagro/movimientosProduccionResumen', component: MovimientosProduccionResumenComponent },


  { path: 'articulos', component: ArticulosComponent },
  { path: 'resumenSocios', component: ResumenSociosComponent },




];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }