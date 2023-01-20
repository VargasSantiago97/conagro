import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.css']
})
export class CompararComponent implements OnInit {

  spinnerCpeExcel:Boolean = true;
  spinnerCpeDescarga:Boolean = true;
  spinnerCuits:Boolean = true;
  spinnerDatos:Boolean = true;
  spinnerCorredores:Boolean = true;
  spinnerSocios:Boolean = true;
  spinnerProduccionSynagro:Boolean = true;


  displayModalFiltros:Boolean = true;

  cpeExcel: any = []
  cpeDescarga: any = []
  produccionSynagro: any = []

  cuits: any = {}
  
  corredores:any = [];
  corredoresDescargaCrudo:any = [];
  DIC_corredores:any = {};

  socios: any = [];
  DIC_socios:any = {};
  
  cols:any = [];
  selectedColumns:any = [];
  
  datosTabla:any = [];
  
  //FILTRO
  filtro_socios: any = [];
  filtro_corredor: any = [];
  
  filtro_sel_socios: any = [];
  filtro_sel_corredor: any = [];


  constructor(
    private comunicacionConagroService: ComunicacionConagroService,
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.cols = [
      {field: "fecha", header: "fecha"},
      {field: "ctg", header: "id"},
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

    this.obtenerTodosCpe()
    this.obtenerTodosCpeDescarga()
    this.obtenerTodosCuits()
    this.obtenerTodosProduccion()
    this.obtenerTodosCorredores()
    this.obtenerTodosCorredoresDescargas()
    this.obtenerTodosSocios()
  }

  obtenerTodosCpe(){
    this.comunicacionConagroService.obtenerTodosCpe().subscribe(
      (res:any) => {
        this.cpeExcel = res

        this.spinnerCpeExcel = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCpeDescarga(){
    this.comunicacionConagroService.obtenerTodosCpeDescarga().subscribe(
      (res:any) => {
        this.cpeDescarga = res
        this.spinnerCpeDescarga = false;
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
        this.spinnerCuits = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  //synagro
  obtenerTodosProduccion() {
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.produccionSynagro = res;
          this.spinnerProduccionSynagro = false;
        },
        err => {
          console.log(err);
        }
    );
  };


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
    this.datosTabla = [];

    this.corredoresDescargaCrudo.map( (registro:any) => {
      var coincideSocio = this.filtro_sel_socios.some((e:any)=>{return e.code == registro.socio});
      var coincideCorredor = this.filtro_sel_corredor.some((e:any)=>{return e.code == registro.corredor});

      if(coincideSocio && coincideCorredor){
        this.datosTabla.push(registro)
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
