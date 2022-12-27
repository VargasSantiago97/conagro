import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-datos-generales-cpe',
  templateUrl: './datos-generales-cpe.component.html',
  styleUrls: ['./datos-generales-cpe.component.css']
})
export class DatosGeneralesCPEComponent implements OnInit {

  constructor(private comunicacionConagroService : ComunicacionConagroService) { }

  cpe: any = [];
  cpeDescarga: any = [];
  cuits: any = {};

  selectedColumns: any = [];
  cols: any = [];

  ngOnInit(): void {
    this.obtenerTodosCpe();
    this.obtenerTodosCuits();
    this.obtenerTodosCpeDescarga();

    this.cols = [
      {field: "nro_cpe", header: "nro_cpe"},
      {field: "estado", header: "estado"},
      {field: "fechaEmision", header: "fechaEmision"},
      {field: "fechaVencimiento", header: "fechaVencimiento"},
      {field: "procedenciaPlanta", header: "procedenciaPlanta"},
      {field: "procedenciaCodLocalidad", header: "procedenciaCodLocalidad"},
      {field: "destinoCuit", header: "destinoCuit"},
      {field: "destinoPlanta", header: "destinoPlanta"},
      {field: "destinoCodLocalidad", header: "destinoCodLocalidad"},
      {field: "destinatarioCuit", header: "destinatarioCuit"},
      {field: "transportistaCuit", header: "transportistaCuit"},
      {field: "transportista2Cuit", header: "transportista2Cuit"},
      {field: "trenNroVagon", header: "trenNroVagon"},
      {field: "trenNroOperativo", header: "trenNroOperativo"},
      {field: "numeroPrecinto", header: "numeroPrecinto"},
      {field: "dominios", header: "dominios"},
      {field: "fletePagadorCuit", header: "fletePagadorCuit"},
      {field: "grnCodigo", header: "grnCodigo"},
      {field: "pesoBruto", header: "pesoBruto"},
      {field: "pesoTara", header: "pesoTara"},
      {field: "pesoCargaCalculado", header: "pesoCargaCalculado"},
      {field: "remitenteComPrimarioCuit", header: "remitenteComPrimarioCuit"},
      {field: "intermediarioCuit", header: "intermediarioCuit"},
      {field: "corredorPrimarioCuit", header: "corredorPrimarioCuit"},
      {field: "corredorSecundarioCuit", header: "corredorSecundarioCuit"},
      {field: "transportistaCuit", header: "transportistaCuit"},
      {field: "representanteCuit", header: "representanteCuit"},
      {field: "representanteRecibidorCuit", header: "representanteRecibidorCuit"},
      {field: "intermediarioFleteCuit", header: "intermediarioFleteCuit"}
  ];

  this.selectedColumns = this.cols;

  }

  obtenerTodosCpe(){
    this.comunicacionConagroService.obtenerTodosCpe().subscribe(
      (res:any) => {
        this.cpe = [ ...res ]
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCpeDescarga(){
    this.comunicacionConagroService.obtenerTodosCpeDescarga().subscribe(
      (res:any) => {
        this.cpeDescarga = [ ...res ]
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCuits(){
    this.comunicacionConagroService.obtenerTodosCuits().subscribe(
      (res:any) => {
        res.map( (e:any) => {
          this.cuits[e.cuit] = {alias: e.alias, razon_social: e.razon_social}
        })
        console.log(this.cuits)

      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  //assets
  transformarDato(e:any){
    if(this.cuits[e]){
      return this.cuits[e].alias
    }
    return e
  }
  tituloCuit(e:any){
    if(this.cuits[e]){
      return this.cuits[e].razon_social
    }
    return 'sin datos'
  }

}
