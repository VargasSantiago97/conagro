import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-corredores-sin-synagro',
  templateUrl: './corredores-sin-synagro.component.html',
  styleUrls: ['./corredores-sin-synagro.component.css']
})
export class CorredoresSinSynagroComponent implements OnInit {

  spinnerDatos:Boolean = true;
  spinnerCorredores:Boolean = true;
  spinnerSocios:Boolean = true;
  spinnerProduccionSynagro:Boolean = true;

  displayModalFiltros:Boolean = true;


  cols:any = [];
  selectedColumns:any = [];

  corredores:any = [];
  corredoresDescarga:any = [];
  corredoresDescargaCrudo:any = [];
  socios: any = [];
  produccionSynagro: any = [];

  DIC_corredores:any = {};
  DIC_socios:any = {};



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
      
      {field: "syn_neto_origen", header: "Neto Origen (Synagro)"},
      {field: "syn_neto_destino", header: "Neto Destino (Synagro)"},
      {field: "syn_destino", header: "Destino (Synagro)"},
      
      {field: "diferencia", header: "DIF."},
    ];
    this.selectedColumns = [
      {field: "id", header: "id"},
      {field: "fecha", header: "fecha"},
      {field: "corredor", header: "corredor"},
      {field: "socio", header: "socio"},
      {field: "nro_ctg", header: "nro_ctg"},
      {field: "kg_descarga", header: "kg_descarga"},
      {field: "kg_mermas", header: "kg_mermas"},
      {field: "kg_neto", header: "kg_neto"},
      
      {field: "syn_neto_origen", header: "Neto Origen (Synagro)"},
      {field: "syn_neto_destino", header: "Neto Destino (Synagro)"},
      {field: "syn_destino", header: "Destino (Synagro)"},
      
      {field: "diferencia", header: "DIF."},
    ];

    this.obtenerTodosCorredores();
    this.obtenerTodosCorredoresDescargas();
    this.obtenerTodosSocios();
    this.obtenerTodosProduccion();
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

  //synagro
  obtenerTodosProduccion() {
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.produccionSynagro = res;
          this.spinnerProduccionSynagro = false;

          console.log(this.produccionSynagro)
        },
        err => {
          console.log(err);
        }
    );
  };


  filtrar(){
    this.corredoresDescarga = [];

    this.corredoresDescargaCrudo.map( (registro:any) => {
      var coincideSocio = this.filtro_sel_socios.some((e:any)=>{return e.code == registro.socio});
      var coincideCorredor = this.filtro_sel_corredor.some((e:any)=>{return e.code == registro.corredor});

      if(coincideSocio && coincideCorredor){
        if(this.produccionSynagro.some( (e:any) => { return e.nro_ctg == registro.nro_ctg })){
          var datoBuscado = this.produccionSynagro.find( (e:any) => { return e.nro_ctg == registro.nro_ctg })
          registro['syn_neto_origen'] = datoBuscado.kg_neto_orig
          registro['syn_neto_destino'] = datoBuscado.kg_neto_dest
          registro['syn_destino'] = datoBuscado.cod_dest

          registro['diferencia'] = parseFloat(registro.kg_neto) - parseFloat(datoBuscado.kg_neto_dest)
        }

        this.corredoresDescarga.push(registro)
      }

    })

    this.displayModalFiltros = false;
  }

  mostrarDatos(entrada:any, tipo:any){
    if(tipo=="corredor"){
      return this.DIC_corredores[entrada].nombre
    }
    if(tipo=="socio"){
      return this.DIC_socios[entrada].nombre
    }
    return entrada
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




AREA
chamico
cod_asignador_cupo
cod_chofer
cod_corredor
cod_cuentayorden1
cod_cuentayorden2
cod_dest
cod_dest_descarga
cod_lote_actividad
cod_periodo
cod_representante
cuerp_ext
cuit_chofer
daniados
destino
diferencia
distancia
factor
fecha
fecha_carga
fecha_cupo
finca
gasto_acondicionamiento
gasto_comercializacion
gasto_flete
hora_carga
humedad1
humedad2
id
id_contratista
id_contrato
id_pc
id_stock_campo
kg_bruto_origen
kg_destino
kg_neto_co
kg_neto_orig
kg_neto_dest
kg_origen
kg_tara_origen
lote
marca_importacion
neto_afip
nombre_chofer
nro_cp
nro_ctg
numero
observar
origen
origen_importacion
otros
patente_acoplado
patente_camion
pcio_flete
precio
proc_calle
proc_codpostal
proc_depto
proc_localidad
proc_nro
proc_provincia
quebrados
remito
romaneo
tierra
tipo
tipo_grano
tipo_origen
tipo_transporte
transporte
usuario
variedad
volatil
zaranda



  */
}
