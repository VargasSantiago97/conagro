import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
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
import {SelectButtonModule} from 'primeng/selectbutton';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import {SplitterModule} from 'primeng/splitter';
import {KnobModule} from 'primeng/knob';
import {TreeModule} from 'primeng/tree';
import {CardModule} from 'primeng/card';
import {DockModule} from 'primeng/dock';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';




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
import { ListaLoteActividadComponent } from './components/lista-lote-actividad/lista-lote-actividad.component';
import { CrearDestinosComponent } from './components/crear-destinos/crear-destinos.component';
import { VerProduccionComponent } from './components/analizar/ver-produccion/ver-produccion.component';
import { CpComponent } from './components/vistas/cp/cp.component';
import { ActualizarListadoCPComponent } from './components/conagro/actualizar-listado-cp/actualizar-listado-cp.component';
import { VerListadoCPComponent } from './components/conagro/ver-listado-cp/ver-listado-cp.component';
import { DatosGeneralesCPEComponent } from './components/conagro/datos-generales-cpe/datos-generales-cpe.component';
import { ImportarDatosPDFComponent } from './components/conagro/importar-datos-pdf/importar-datos-pdf.component';
import { CorredoresComponent } from './components/corredores/corredores/corredores.component';
import { DescargasComponent } from './components/corredores/descargas/descargas.component';
import { CargarDescargasComponent } from './components/corredores/cargar-descargas/cargar-descargas.component';
import { CompararComponent } from './components/conagro/comparar/comparar.component';
import { CorredoresSinSynagroComponent } from './components/conagro/corredores-sin-synagro/corredores-sin-synagro.component';
import { MovimientosProduccionComponent } from './components/conagro/movimientos-produccion/movimientos-produccion.component';
import { MovimientosProduccionResumenComponent } from './components/conagro/movimientos-produccion-resumen/movimientos-produccion-resumen.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ResumenSociosComponent } from './components/resumen-socios/resumen-socios.component';
import { ResumenSociosExcelComponent } from './components/resumen-socios-excel/resumen-socios-excel.component';
import { SinPermisoComponent } from './components/sin-permiso/sin-permiso.component';
import { ImportarKilosComponent } from './components/importar-kilos/importar-kilos.component';


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
    PatentesComponent,
    ListaLoteActividadComponent,
    CrearDestinosComponent,
    VerProduccionComponent,
    CpComponent,
    ActualizarListadoCPComponent,
    VerListadoCPComponent,
    DatosGeneralesCPEComponent,
    ImportarDatosPDFComponent,
    CorredoresComponent,
    DescargasComponent,
    CargarDescargasComponent,
    CompararComponent,
    CorredoresSinSynagroComponent,
    MovimientosProduccionComponent,
    MovimientosProduccionResumenComponent,
    ArticulosComponent,
    ResumenSociosComponent,
    ResumenSociosExcelComponent,
    SinPermisoComponent,
    ImportarKilosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    PdfJsViewerModule,

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
    RadioButtonModule,
    SelectButtonModule,
    CascadeSelectModule,
    DividerModule,
    ChartModule,
    CalendarModule,
    ChipsModule,
    AutoCompleteModule,
    MultiSelectModule,
    ListboxModule,
    SplitterModule,
    KnobModule,
    TreeModule,
    CardModule,
    DockModule,
    ContextMenuModule,
    ToastModule,
    InputTextareaModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
