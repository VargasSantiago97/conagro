import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  spinnerDatos:Boolean = true;
  spinnerCorredores:Boolean = true;
  spinnerSocios:Boolean = true;

  displayModalFiltros:Boolean = true;


  cols:any = [];
  selectedColumns:any = [];

  corredores:any = [];
  corredoresDescarga:any = [];
  corredoresDescargaCrudo:any = [];
  DIC_corredores:any = {};

  socios: any = [];
  DIC_socios:any = {};


  //FILTRO
  filtro_socios: any = [];
  filtro_corredor: any = [];
  
  filtro_sel_socios: any = [];
  filtro_sel_corredor: any = [];


  constructor(private comunicacionConagroService: ComunicacionConagroService) { }

  ngOnInit(): void {
    this.cols = [
      {field: "id", header: "id"},
      {field: "fecha", header: "fecha"},
      {field: "corredor", header: "corredor"},
      {field: "socio", header: "socio"},
      {field: "nro_ctg", header: "nro_ctg"},
      {field: "descarga", header: "descarga"},
      {field: "kg_bruto", header: "kg_bruto"},
      {field: "kg_tara", header: "kg_tara"},
      {field: "kg_descarga", header: "kg_descarga"},
      {field: "humedad", header: "humedad"},
      {field: "kg_mermas", header: "kg_mermas"},
      {field: "kg_neto", header: "kg_neto"},
      {field: "observaciones", header: "observaciones"},
    ];
    this.selectedColumns = [
      {field: "id", header: "id"},
      {field: "fecha", header: "fecha"},
      {field: "corredor", header: "corredor"},
      {field: "socio", header: "socio"},
      {field: "nro_ctg", header: "nro_ctg"},
      {field: "descarga", header: "descarga"},
      {field: "kg_bruto", header: "kg_bruto"},
      {field: "kg_tara", header: "kg_tara"},
      {field: "kg_descarga", header: "kg_descarga"},
      {field: "humedad", header: "humedad"},
      {field: "kg_mermas", header: "kg_mermas"},
      {field: "kg_neto", header: "kg_neto"},
      {field: "observaciones", header: "observaciones"},
    ];

    this.obtenerTodosCorredores();
    this.obtenerTodosCorredoresDescargas();
    this.obtenerTodosSocios();
  }

  obtenerTodosCorredores(){
    this.comunicacionConagroService.obtenerTodosCorredores().subscribe(
      (res:any) => {
        this.corredores = res;
        this.filtro_corredor = [];
        this.filtro_sel_corredor = [];

        res.map((e:any)=> { 
          this.DIC_corredores[e.id] = e;
  
          this.filtro_corredor.push({code: e.id, name: e.nombre})
          this.filtro_sel_corredor.push({code: e.id, name: e.nombre})
        })
        this.spinnerCorredores = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }
  
  obtenerTodosCorredoresDescargas(){
    this.comunicacionConagroService.obtenerTodosCorredoresDescargas().subscribe(
      (res:any) => {
        this.corredoresDescargaCrudo = res;
        this.spinnerDatos = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }
  
  obtenerTodosSocios(){
    this.comunicacionConagroService.obtenerTodosSocios().subscribe(
      (res:any) => {
        this.socios = res;
        this.filtro_socios = [];
        this.filtro_sel_socios = [];

        res.map((e:any)=> {
          this.DIC_socios[e.id] = e;

          this.filtro_socios.push({code: e.id, name: e.nombre})
          this.filtro_sel_socios.push({code: e.id, name: e.nombre})
        })
        this.spinnerSocios = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }


  filtrar(){
    this.corredoresDescarga = [];

    this.corredoresDescargaCrudo.map( (registro:any) => {
      var coincideSocio = this.filtro_sel_socios.some((e:any)=>{return e.code == registro.socio});
      var coincideCorredor = this.filtro_sel_corredor.some((e:any)=>{return e.code == registro.corredor});

      if(coincideSocio && coincideCorredor){
        this.corredoresDescarga.push(registro)
      }

    })

    this.displayModalFiltros = false;
  }

  /* 

corredor
descarga
humedad
id
kg_bruto
kg_descarga
kg_mermas
kg_neto
kg_tara
nro_ctg
observaciones
socio
  */
}
