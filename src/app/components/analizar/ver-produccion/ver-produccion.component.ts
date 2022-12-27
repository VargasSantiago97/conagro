import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-ver-produccion',
  templateUrl: './ver-produccion.component.html',
  styleUrls: ['./ver-produccion.component.css']
})
export class VerProduccionComponent implements OnInit {

  spinnerProduccion: Boolean = true;
  spinnerDestinos: Boolean = true;
  spinnerLotes: Boolean = true;

  displayProduc: Boolean = false;
  displayData: any = [];

  datosCrudos: any = [];

  destinos: any = [];
  lotes: any = [];

  produccion : any = [];

  dateRange: any = [];
  remitos: any = [];
  nro_cp: any = [];
  nro_ctg: any = [];

  tipo_origen: any;
  origen: any;
  origenes: any = [];

  tipo_destino: any;
  destino: any = [];
  destinosSuggestions: any = [];

  tipo_descarga: any;
  descarga: any = [];
  descargasSuggestions: any = [];

  selectedAREA: any = [];
  selectedPeriodo: any = [];

  //tabla data
  dataTotalRegistros:any = 0;
  dataRegistrosSinDestino:any = 0;
  dataPorcentajeFaltaDestino:any = 0;
  dataKgOrigen:any = 0;
  dataKgNetoOrigen:any = 0;
  dataKgDestino:any = 0;
  dataKgNetoDestino:any = 0;

  dataTotalRegistrosCONdesc: any = 0;
  dataKgOrigenCONdesc: any = 0;
  dataKgNetoOrigenCONdesc: any = 0;
  dataKgDestinoCONdesc: any = 0;
  dataKgNetoDestinoCONdesc: any = 0;
  dataDiferenciaNetoOrigen_Destino: any = 0;
  dataDiferenciaDestino_NetoDestino: any = 0;
  dataDiferenciaNetoOrigen_Destino_Porc: any = 0;
  dataDiferenciaDestino_NetoDestino_Porc: any = 0;

  //graficos
  kg_totalesData: any;
  kg_totalesOptions: any;

  kg_sinDestinoData: any;
  kg_sinDestinoOptions: any;

  constructor(private comunicacionService : ComunicacionService) { }

  ngOnInit(): void {
    this.obtenerTodosProduccion()
    this.obtenerTodosDestinos()
    this.obtenerTodosLotes()

    this.kg_totalesOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        },
        title: {
          display: true,
          text: 'KILOGRAMOS TOTALES (TODOS DEL LISTADO)',
          fontSize: 20
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    this.kg_sinDestinoOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        },
        title: {
          display: true,
          text: 'KILOGRAMOS (REGISTROS QUE TIENEN DESTINO)',
          fontSize: 20
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
  paraPruebas_BORRAR(){
    this.selectedPeriodo = ["4"]
    this.selectedAREA = ["2"]
    this.filtrar()
  }
  ver(){
    let dataa = new Date(this.datosCrudos[512].fecha)
    console.log(this.datosCrudos[512].fecha)
    dataa.setHours(dataa.getHours()+3);
    console.log(dataa)
    

    
    console.log(dataa < this.dateRange[0])
    console.log(this.dateRange[0])
  }

  //DATOS BACKEND - SYNAGRO
  obtenerTodosProduccion() {
    this.spinnerDestinos = true
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.datosCrudos = [ ...res]
          this.spinnerProduccion = false
          this.paraPruebas_BORRAR()
        },
        err => {
          console.log(err);
        }
    );
  };
  obtenerTodosDestinos() {
    this.spinnerProduccion = true
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          this.destinos = [...res];
          this.spinnerDestinos = false;
        },
        err => {
            console.log(err);
        }
    );
  };
  obtenerTodosLotes() {
    this.spinnerLotes = true
    this.lotes = []
    this.comunicacionService.obtenerTodosLotes().subscribe(
        (res: any) => {
          res.map( (e:any) => {
            this.lotes.push({ ...e, nombre:e.descrip})
          })
          this.spinnerLotes = false;
        },
        err => {
            console.log(err);
        }
    );
  };

  //FILTROS
  todosPeriodo(){
    if(this.selectedPeriodo.length){
      this.selectedPeriodo = []
    } else {
      this.selectedPeriodo = ["2", "3", "4", "5"]
    }
  }
  todosCultivo(){
    if(this.selectedAREA.length){
      this.selectedAREA = []
    } else {
      this.selectedAREA = ["1", "2", "3", "4", "10"]
    }
  }
  todosOrigen(){
    this.tipo_origen = null
    this.origen = null
  }
  todosDestino(){
    this.tipo_destino = null
    this.destino = null
  }
  todosDescarga(){
    this.tipo_descarga = null
    this.descarga = null
  }

  filterDestino(event:any) {
    var valores_filtrar:any = this.destinos.filter((e:any)=>{ return e.id_tipo_destino == this.tipo_destino})

    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < valores_filtrar.length; i++) {
        let el_destino = valores_filtrar[i];
        if (el_destino.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(el_destino);
        }
    }
    this.destinosSuggestions = filtered;
  }
  
  filterOrigen(event:any) {
    var valores_filtrar:any = []
    if(this.tipo_origen=="S"){
      valores_filtrar = this.destinos
    } else if (this.tipo_origen=="L"){
      valores_filtrar = this.lotes
    }

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < valores_filtrar.length; i++) {
        let el_origen = valores_filtrar[i];
        if (el_origen.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(el_origen);
        }
    }
    this.origenes = filtered;
  }

  filterDescarga(event:any) {
    var valores_filtrar:any = this.destinos.filter((e:any)=>{ return e.id_tipo_destino == this.tipo_descarga})

    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < valores_filtrar.length; i++) {
        let la_descarga = valores_filtrar[i];
        if (la_descarga.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(la_descarga);
        }
    }
    this.descargasSuggestions = filtered;
  }

  //VER DATOS -> MODAL
  mostrarProduccion(numero:any){
    this.displayProduc = true;
    this.displayData = this.datosCrudos.find( (e:any) => {return e.numero == numero})
  }

  //APLICAR FILTROS
  filtrar(){
    this.produccion = []

    var destinosPermitidos: any = []
    var descargasPermitidos: any = []

    if(this.tipo_destino){
      if(this.destino.codigo){
        destinosPermitidos = [this.destino.codigo]
      }else{
        this.destinos.map( (dest:any) => {
          if(dest.id_tipo_destino == this.tipo_destino){
            destinosPermitidos.push(dest.codigo)
          }
        })
      }
    }

    if(this.tipo_descarga){
      if(this.descarga.codigo){
        descargasPermitidos = [this.descarga.codigo]
      }else{
        this.destinos.map( (dest:any) => {
          if(dest.id_tipo_destino == this.tipo_descarga){
            descargasPermitidos.push(dest.codigo)
          }
        })
      }
    }

    this.datosCrudos.map( (registro:any) =>{
      let coin_periodo = false;
      let coin_area = false;
      let coin_tipo_origen = false;
      let coin_origen = false;
      let coin_destino = false;
      let coin_descarga = false;
      let coin_remito = true;
      let coin_nro_cp = true;
      let coin_nro_ctg = true;
      let coin_fecha = false;

      //FECHA
      if(this.dateRange[0] && this.dateRange[1]){
        let dateRegistro = new Date(registro.fecha)
        dateRegistro.setHours(dateRegistro.getHours()+3);
        coin_fecha = (this.dateRange[0] <=  dateRegistro) && (dateRegistro <= this.dateRange[1])
      }else{
        coin_fecha = true
      }
      //CAMPAÑA
      if(this.selectedPeriodo.includes(registro.cod_periodo)){
        coin_periodo = true
      }

      //AREA
      if(this.selectedAREA.includes(registro.AREA)){
        coin_area = true
      }

      //TIPO ORIGEN
      if(this.tipo_origen){
        coin_tipo_origen = this.tipo_origen == registro.tipo_origen
      }else{
        coin_tipo_origen = true;
      }

      //ORIGEN
      if(this.origen){
        if(this.tipo_origen == 'L'){
          coin_origen = this.origen.codigo == registro.lote

        } else if(this.tipo_origen == 'S'){
          coin_origen = this.origen.codigo == registro.origen
        } else {
          coin_origen = true;
        }
      }else{
        coin_origen = true;
      }

      //DESTINO
      coin_destino = destinosPermitidos.length ? destinosPermitidos.includes(registro.cod_dest) : true;

      //DESCARGAS
      coin_descarga = descargasPermitidos.length ? descargasPermitidos.includes(registro.cod_dest_descarga) : true;


      //REMITO
      if(this.remitos.length){
        coin_remito = this.remitos.includes(registro.remito)
      }
      
      //CARTA DE PORTE
      if(this.nro_cp.length){
        coin_nro_cp = this.nro_cp.includes(registro.nro_cp)
      }

      //CARTA DE PORTE
      if(this.nro_cp.length){
        coin_nro_cp = this.nro_cp.includes(registro.nro_cp)
      }

      //C.T.G.
      if(this.nro_ctg.length){
        coin_nro_ctg = this.nro_ctg.includes(registro.nro_ctg)
      }


      if(coin_area && coin_periodo && coin_tipo_origen && coin_origen && coin_destino && coin_remito && coin_nro_cp && coin_nro_ctg && coin_descarga && coin_fecha){
        this.produccion.push(registro)
      }
    })

    this.sumarTotales()
    this.sumarTotalesConDestino()
    this.datosParaTabla()
  }


  //########  CALCULOS
  datosParaTabla(){
    this.dataTotalRegistros = 0;
    this.dataRegistrosSinDestino = 0;
    this.dataPorcentajeFaltaDestino = 0;
    this.dataKgOrigen = 0;
    this.dataKgNetoOrigen = 0;
    this.dataKgDestino = 0;
    this.dataKgNetoDestino = 0;

    this.dataTotalRegistrosCONdesc = 0;
    this.dataKgOrigenCONdesc = 0;
    this.dataKgNetoOrigenCONdesc = 0;
    this.dataKgDestinoCONdesc = 0;
    this.dataKgNetoDestinoCONdesc = 0;

    this.produccion.map( (registro:any) => {
      this.dataTotalRegistros++;

      this.dataKgOrigen += parseFloat(registro.kg_origen)
      this.dataKgNetoOrigen += parseFloat(registro.kg_neto_orig)
      this.dataKgDestino += parseFloat(registro.kg_destino)
      this.dataKgNetoDestino += parseFloat(registro.kg_neto_dest)

      if(registro.kg_neto_dest == 0){
        this.dataRegistrosSinDestino++;
      } else {
        this.dataTotalRegistrosCONdesc++;

        this.dataKgOrigenCONdesc += parseFloat(registro.kg_origen)
        this.dataKgNetoOrigenCONdesc += parseFloat(registro.kg_neto_orig)
        this.dataKgDestinoCONdesc += parseFloat(registro.kg_destino)
        this.dataKgNetoDestinoCONdesc += parseFloat(registro.kg_neto_dest)
      }

    })

    
    this.dataDiferenciaNetoOrigen_Destino = new Intl.NumberFormat('de-DE').format(this.dataKgNetoOrigenCONdesc - this.dataKgDestinoCONdesc)
    this.dataDiferenciaDestino_NetoDestino = new Intl.NumberFormat('de-DE').format(this.dataKgDestinoCONdesc - this.dataKgNetoDestinoCONdesc)

    this.dataDiferenciaNetoOrigen_Destino_Porc = (this.dataDiferenciaNetoOrigen_Destino / this.dataKgNetoOrigenCONdesc * 100).toFixed(4)
    this.dataDiferenciaDestino_NetoDestino_Porc = (this.dataDiferenciaDestino_NetoDestino / this.dataKgDestinoCONdesc * 100).toFixed(4)

    this.dataPorcentajeFaltaDestino = (this.dataRegistrosSinDestino / this.dataTotalRegistros * 100).toFixed(2)

    this.dataKgOrigen = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgOrigen))
    this.dataKgNetoOrigen = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgNetoOrigen))
    this.dataKgDestino = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgDestino))
    this.dataKgNetoDestino = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgNetoDestino))

    this.dataKgOrigenCONdesc = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgOrigenCONdesc))
    this.dataKgNetoOrigenCONdesc = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgNetoOrigenCONdesc))
    this.dataKgDestinoCONdesc = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgDestinoCONdesc))
    this.dataKgNetoDestinoCONdesc = new Intl.NumberFormat('de-DE').format(parseInt(this.dataKgNetoDestinoCONdesc))

  }

  sumarTotales(){
    var sumatoria_kg_origen = 0
    var sumatoria_kg_neto_orig = 0
    var sumatoria_kg_destino = 0
    var sumatoria_kg_neto_dest = 0

    this.produccion.map( (registro:any) => {
      sumatoria_kg_origen += parseFloat(registro.kg_origen) ? parseFloat(registro.kg_origen) : 0;
      sumatoria_kg_neto_orig += parseFloat(registro.kg_neto_orig) ? parseFloat(registro.kg_neto_orig) : 0;
      sumatoria_kg_destino += parseFloat(registro.kg_destino) ? parseFloat(registro.kg_destino) : 0;
      sumatoria_kg_neto_dest += parseFloat(registro.kg_neto_dest) ? parseFloat(registro.kg_neto_dest) : 0;
    })

    this.kg_totalesData = {
      labels: ['ORIGEN', 'DESTINO', 'ORIGEN-DESTINO'],
      datasets: [
          {
              label: 'KG BRUTO',
              backgroundColor: '#42A5F5',
              data: [sumatoria_kg_origen, sumatoria_kg_destino, sumatoria_kg_origen-sumatoria_kg_destino]
          },
          {
            label: 'KG NETO',
            backgroundColor: '#FFA726',
            data: [sumatoria_kg_neto_orig, sumatoria_kg_neto_dest, sumatoria_kg_neto_orig-sumatoria_kg_neto_dest]
          }
      ]
    };
  }

  sumarTotalesConDestino(){
    var sumatoria_kg_origen = 0
    var sumatoria_kg_neto_orig = 0
    var sumatoria_kg_destino = 0
    var sumatoria_kg_neto_dest = 0

    this.produccion.map( (registro:any) => {
      var kg_neto_dest = parseFloat(registro.kg_neto_dest) ? parseFloat(registro.kg_neto_dest) : 0;

      if(kg_neto_dest){
        sumatoria_kg_neto_dest += kg_neto_dest
        sumatoria_kg_origen += parseFloat(registro.kg_origen) ? parseFloat(registro.kg_origen) : 0;
        sumatoria_kg_neto_orig += parseFloat(registro.kg_neto_orig) ? parseFloat(registro.kg_neto_orig) : 0;
        sumatoria_kg_destino += parseFloat(registro.kg_destino) ? parseFloat(registro.kg_destino) : 0;
      }
    })

    this.kg_sinDestinoData = {
      labels: ['ORIGEN', 'DESTINO', 'ORIGEN-DESTINO'],
      datasets: [
          {
              label: 'KG BRUTO',
              backgroundColor: '#42A5F5',
              data: [sumatoria_kg_origen, sumatoria_kg_destino, sumatoria_kg_origen-sumatoria_kg_destino]
          },
          {
            label: 'KG NETO',
            backgroundColor: '#FFA726',
            data: [sumatoria_kg_neto_orig, sumatoria_kg_neto_dest, sumatoria_kg_neto_orig-sumatoria_kg_neto_dest]
          }
      ]
  };
  }
}

/* 
AREA : "4"
chamico : "0.00"
cod_asignador_cupo : null
cod_chofer : null
cod_corredor : null
cod_cuentayorden1 : null
cod_cuentayorden2 : null
cod_dest : "4"
cod_dest_descarga : "4"
cod_lote_actividad : "8"
cod_periodo : "2"
cod_representante : null
cuerp_ext : "0.00"
cuit_chofer : null
daniados : "0.00"
destino : null
diferencia : "0.0000"
distancia : null

factor : "97.20"
fecha : "2020-02-01"
fecha_carga : "2020-03-05"
fecha_cupo : null
finca : null
gasto_acondicionamiento : null
gasto_comercializacion : null
gasto_flete : null
hora_carga : "11:26:16"
humedad1 : "0.0"
humedad2 : "0.0"
id : "5931555"
id_contratista : null
id_contrato : null
id_pc : null
id_stock_campo : null
kg_bruto_origen : "26646.0000"
kg_destino : "26646.000"
kg_neto_co : null
kg_neto_dest : "25899.9120"
kg_neto_orig : "26646.0000"
kg_origen : "26646.0000"
kg_tara_origen : "0"
lote : "1"
marca_importacion : null
neto_afip : null
nombre_chofer : null
nro_cp : "582252425"
nro_ctg : null
numero : "93"
observar : null
origen : null
origen_importacion : null
otros : "0.00"
patente_acoplado : null
patente_camion : null
pcio_flete : null
precio : null
proc_calle : null
proc_codpostal : null
proc_depto : null
proc_localidad : null
proc_nro : null
proc_provincia : null
quebrados : "0.00"
remito : null
romaneo : null
tierra : "0.00"
tipo : null
tipo_grano : null
tipo_origen : "L"
tipo_transporte : "S"
transporte : null
usuario : "ADMIN"
variedad : null
volatil : "0.00"
zaranda : "0.00"


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
kg_neto_dest
kg_neto_orig
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