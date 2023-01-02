import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';
declare var vars: any;
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-datos-generales-cpe',
  templateUrl: './datos-generales-cpe.component.html',
  styleUrls: ['./datos-generales-cpe.component.css']
})
export class DatosGeneralesCPEComponent implements OnInit {

  constructor(
    private comunicacionConagroService : ComunicacionConagroService,
    private comunicacionService : ComunicacionService
  ) { }
  API_URI = vars.API_URI_CONAGRO;

  cpeExcel: any = [];
  cpeDescarga: any = {};
  socios: any = [];
  cuits: any = {};

  tablasGranos: any = {};
  tablasEstados: any = {};

  //synagro
  produccionSynagro: any = [];

  sociosId: any = {}

  datosTabla: any = []

  selectedColumns: any = [];
  cols: any = [];

  spinnerCpeExcel: Boolean = true;
  spinnerCpeDescarga: Boolean = true;
  spinnerCuits: Boolean = true;
  spinnerSocios: Boolean = true;
  spinnerProduccionSynagro: Boolean = true;

  //FILTROS
  displayModalFiltros: Boolean = false;

  socioSeleccionado: any = 0;
  tipoCpe: any = '74';

  dateRangeEmision: any = []
  dateRangeVto: any = []

  list_destino: any = []
  list_destinatario: any = []
  list_transportista: any = []
  list_corredorprimario: any = []
  list_corredorsecundario: any = []
  list_representante: any = []
  list_representanterecibidor: any = []
  list_remitenteprimario: any = []
  list_intermediario: any = []

  destino: any = [];
  destinatario: any = [];
  transportista: any = [];
  corredorprimario: any = [];
  corredorsecundario: any = [];
  representante: any = [];
  representanterecibidor: any = [];
  remitenteprimario: any = [];
  intermediario: any = [];

  sel_destino: any = [];
  sel_destinatario: any = [];
  sel_transportista: any = [];
  sel_corredorprimario: any = [];
  sel_corredorsecundario: any = [];
  sel_representante: any = [];
  sel_representanterecibidor: any = [];
  sel_remitenteprimario: any = [];
  sel_intermediario: any = [];

  selectedPDFDescarga: any = ["con_descarga",   "sin_descarga"];
  selectedSynagro: any = ["con_synagro",   "sin_synagro", "distinto_cero", "igual_cero"];
  selectedGranos: any = ["19", "23", "103", "104", "2"];
  selectedEstados: any = ["AC", "BR", "CF", "CO", "CN", "AP", "PA", "AN", "RE", "DE", "DD", "PE", "IN", "PO"];


  //TOTALES
  contadorSumados:any = {};
  contadorNoSumados:any = {};
  totales: any = {};


  ngOnInit(): void {
    this.obtenerTodosCuits();
    this.obtenerTodosCpeDescarga();
    this.obtenerTodosSocios();

    this.obtenerTodosProduccion();

    this.cols = [
      {field: "estado", header: "Est."},
      {field: "fechaEmision", header: "F. Emis."},
      {field: "fechaVencimiento", header: "F. Vto."},
      {field: "procedenciaCodLocalidad", header: "Proc. Localidad"},
      {field: "procedenciaPlanta", header: "Proc. Planta"},
      {field: "destinoCodLocalidad", header: "Dest. Localidad"},
      {field: "destinoCuit", header: "Destino"},
      {field: "destinoPlanta", header: "Dest. Planta"},
      {field: "destinatarioCuit", header: "Destinatario"},
      {field: "transportistaCuit", header: "Transportista"},
      {field: "transportista2Cuit", header: "Transportista2"},
      {field: "numeroPrecinto", header: "Nro. Precinto"},
      {field: "dominios", header: "Patentes"},
      {field: "fletePagadorCuit", header: "Flete Pagador"},
      {field: "pesoBruto", header: "Bruto (CP)"},
      {field: "pesoTara", header: "Tara (CP)"},
      {field: "pesoCargaCalculado", header: "Carga (CP)"},
      {field: "kg_destino", header: "Kg Bruto Dest"},
      {field: "kg_tara_dest", header: "Kg Tara Dest"},
      {field: "kg_neto_dest", header: "Kg Neto Dest"},
      {field: "synagro_kg_neto_orig", header: "Kg Neto Orig (Synagro)"},
      {field: "synagro_kg_neto_dest", header: "Kg Neto Dest (Synagro)"},
      {field: "remitenteComPrimarioCuit", header: "Remit. Comer. Pri."},
      {field: "intermediarioCuit", header: "Intermediario"},
      {field: "corredorPrimarioCuit", header: "Corredor Prim."},
      {field: "corredorSecundarioCuit", header: "Corredor Sec."},
      {field: "transportistaCuit2", header: "Transportista (2)"},
      {field: "representanteCuit", header: "Representante"},
      {field: "representanteRecibidorCuit", header: "Repres. Recibidor"},
      {field: "intermediarioFleteCuit", header: "Inter. Flete"},
      {field: "trenNroVagon", header: "Nro Vagon (Tren)"},
      {field: "trenNroOperativo", header: "Nro Operat. (Tren)"},
      
      
      
    ];
    this.selectedColumns = [
    {field: "estado", header: "Est."},
    {field: "fechaEmision", header: "F. Emis."},
    {field: "destinoCodLocalidad", header: "Dest. Localidad"},
    {field: "destinoCuit", header: "Destino"},
    {field: "transportistaCuit", header: "Transportista"},
    {field: "dominios", header: "Patentes"},
    {field: "kg_destino", header: "Kg Bruto Dest"},
    {field: "kg_tara_dest", header: "Kg Tara Dest"},
    {field: "kg_neto_dest", header: "Kg Neto Dest"},
    {field: "synagro_kg_neto_orig", header: "Kg Neto Orig (Synagro)"},
    {field: "synagro_kg_neto_dest", header: "Kg Neto Dest (Synagro)"},
    {field: "corredorPrimarioCuit", header: "Corredor Prim."},
    {field: "corredorSecundarioCuit", header: "Corredor Sec."},
    ];
    this.tablasGranos = {
      19: 'Maiz',
      23: 'Soja',
      103: 'Trigo Pan',
      104: 'Sorgo Forr.',
      2: 'Girasol',
    }
    this.tablasEstados = {
      AC: "Activa",
      BR: "Borrador",
      CF: "Activa con confirmacion de arribo",
      CO: "Activa con contingencia",
      CN: "Confirmada",
      AP: "Anulada por el productor",
      PA: "Pendiente de Aceptacion por el Productor",
      AN: "Anulada",
      RE: "Rechazada",
      DE: "Desactivada",
      DD: "Descargado en destino",
      PE: "Pendiente de emisión",
      IN: "Inactiva",
      PO: "Pendiente de Aceptacion por el Origen"
    }

  }

  //Cartas de Porte que fueron importadas desde excel. Recorre y crea las listas para los filtros
  obtenerTodosCpe(){
    this.spinnerCpeExcel = true;
    this.comunicacionConagroService.obtenerTodosCpe().subscribe(
      (res:any) => {
        this.cpeExcel = []
        res.map((e:any)=>{

          this.list_destino.includes(e.destinoCuit) ? null : this.list_destino.push(e.destinoCuit)
          this.list_destinatario.includes(e.destinatarioCuit) ? null : this.list_destinatario.push(e.destinatarioCuit)
          this.list_transportista.includes(e.transportistaCuit) ? null : this.list_transportista.push(e.transportistaCuit)
          this.list_corredorprimario.includes(e.corredorPrimarioCuit) ? null : this.list_corredorprimario.push(e.corredorPrimarioCuit)
          this.list_corredorsecundario.includes(e.corredorSecundarioCuit) ? null : this.list_corredorsecundario.push(e.corredorSecundarioCuit)
          this.list_representante.includes(e.representanteCuit) ? null : this.list_representante.push(e.representanteCuit)
          this.list_representanterecibidor.includes(e.representanteRecibidorCuit) ? null : this.list_representanterecibidor.push(e.representanteRecibidorCuit)
          this.list_remitenteprimario.includes(e.remitenteComPrimarioCuit) ? null : this.list_remitenteprimario.push(e.remitenteComPrimarioCuit)
          this.list_intermediario.includes(e.intermediarioCuit) ? null : this.list_intermediario.push(e.intermediarioCuit)

          e['ctg'] = e.cpe;
          this.cpeExcel.push(e);
        })

        this.arr_destino();
        this.arr_destinatario();
        this.arr_transportista();
        this.arr_corredorprimario();
        this.arr_corredorsecundario();
        this.arr_representante();
        this.arr_representanterecibidor();
        this.arr_remitenteprimario();
        this.arr_intermediario();

        this.spinnerCpeExcel = false;
        this.displayModalFiltros = true;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosSocios(){
    this.spinnerSocios = true;
    this.comunicacionConagroService.obtenerTodosSocios().subscribe(
      (res:any) => {
        this.socios = [ ...res, {id:0, nombre:'TODOS'}]
        res.map( (e:any) => {
          this.sociosId[e.id] = e.nombre
        })
        this.spinnerSocios = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCpeDescarga(){
    this.spinnerCpeDescarga = true;
    this.comunicacionConagroService.obtenerTodosCpeDescarga().subscribe(
      (res:any) => {
        this.cpeDescarga = {}
        res.map( (e:any) => {
          this.cpeDescarga[e.nro_ctg] = e;
        })
        this.spinnerCpeDescarga = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCuits(){
    this.spinnerCuits = true;
    this.comunicacionConagroService.obtenerTodosCuits().subscribe(
      (res:any) => {
        res.map( (e:any) => {
          this.cuits[e.cuit] = {alias: e.alias, razon_social: e.razon_social}
        })
        this.spinnerCuits = false;
        this.obtenerTodosCpe();
      },
      (err:any) => {
        console.log(err)
      }
    )
  }


  //synagro
  obtenerTodosProduccion() {
    this.spinnerProduccionSynagro = true;
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.produccionSynagro = [];
          res.map( (e:any) => {
            if(e.nro_cp){
              if(e.nro_cp.length == 11){
                if((e.nro_cp[0] + e.nro_cp[1] + e.nro_cp[2]) == '101'){
                  e.nro_ctg = e.nro_cp
                }
              }
            }
            this.produccionSynagro.push(e)
          })
          this.spinnerProduccionSynagro = false;
        },
        err => {
          console.log(err);
        }
    );
  };


  //assets
  transformarDato(e:any, tipo:any){

    if(this.cuits[e]){
      return this.cuits[e].alias
    }
    if(tipo == "estado"){
      return this.tablasEstados[e]
    }

    if(tipo == "pesoBruto"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "pesoTara"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "pesoCargaCalculado"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "kg_destino"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "kg_tara_dest"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "kg_neto_dest"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "synagro_kg_neto_orig"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }
    if(tipo == "synagro_kg_neto_dest"){
      let dato = parseFloat(e);
      if(dato){
        return this.mostrarNumero(dato, 0)
      }
    }

    return e
  }
  tituloCuit(e:any){
    if(this.cuits[e]){
      return this.cuits[e].razon_social + " (" + e + ")";
    }
    return 'sin datos'
  }
  cerrarModal(){
    this.displayModalFiltros=false
    this.filtrarDatos()
  }

  arr_destino(){
    this.list_destino.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.destino.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_destino = [ ...this.destino ]
  }
  arr_destinatario(){
    this.list_destinatario.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.destinatario.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_destinatario = [ ...this.destinatario ]
  }
  arr_transportista(){
    this.list_transportista.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.transportista.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_transportista = [ ...this.transportista ]
  }
  arr_corredorprimario(){
    this.list_corredorprimario.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.corredorprimario.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_corredorprimario = [ ...this.corredorprimario ]
  }
  arr_corredorsecundario(){
    this.list_corredorsecundario.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.corredorsecundario.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_corredorsecundario = [ ...this.corredorsecundario ]
  }
  arr_representante(){
    this.list_representante.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.representante.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_representante = [ ...this.representante ]
  }
  arr_representanterecibidor(){
    this.list_representanterecibidor.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.representanterecibidor.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_representanterecibidor = [ ...this.representanterecibidor ]
  }
  arr_remitenteprimario(){
    this.list_remitenteprimario.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.remitenteprimario.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_remitenteprimario = [ ...this.remitenteprimario ]
  }
  arr_intermediario(){
    this.list_intermediario.map( (e:any) => {
      if(e != null && e != 'null'){
        if(this.cuits[e]){
          this.intermediario.push({code:e, name:this.cuits[e].alias})
        }
      }
    })
    this.sel_intermediario = [ ...this.intermediario ]
  }


  filtrarDatos(){
    this.datosTabla = [];
    this.cpeExcel.forEach( (cpe:any) => {
      //errors:
      let coincide_socio = true;
      let coincide_fechaEmision = false;
      let coincide_fechaVto = false;

      let destino = false;
      let destinatario = false;
      let transportista = false;
      let corredorprimario = false;
      let corredorsecundario = false;
      let representante = false;
      let representanterecibidor = false;
      let remitenteprimario = false;
      let intermediario = false;

      //SOCIO
      if(this.socioSeleccionado != '0'){
        coincide_socio = cpe.socio == this.socioSeleccionado;
      }

      //FECHA EMISION
      if(this.dateRangeEmision){
        if(this.dateRangeEmision[0] && this.dateRangeEmision[1]){
          let dateRegistro = new Date(cpe.fechaEmision)
          dateRegistro.setHours(dateRegistro.getHours()+3);
          coincide_fechaEmision = (this.dateRangeEmision[0] <=  dateRegistro) && (dateRegistro <= this.dateRangeEmision[1])
        }else{
          coincide_fechaEmision = true
        }
      }else{
        coincide_fechaEmision = true
      }

      //FECHA VTO
      if(this.dateRangeVto){
        if(this.dateRangeVto[0] && this.dateRangeVto[1]){
          let dateRegistro = new Date(cpe.fechaVencimiento)
          dateRegistro.setHours(dateRegistro.getHours()+3);
          coincide_fechaVto = (this.dateRangeVto[0] <=  dateRegistro) && (dateRegistro <= this.dateRangeVto[1])
        }else{
          coincide_fechaVto = true
        }
      }else{
        coincide_fechaVto = true
      }

      //destino
      if(this.destino.length != this.sel_destino.length){
        if(cpe.destinoCuit){
          if(cpe.destinoCuit.length == 11){
            destino = this.sel_destino.some( (buscar:any) => {return buscar.code == cpe.destinoCuit});
          }
        }
      }else{
        destino = true
      }

      //destinatario
      if(this.destinatario.length != this.sel_destinatario.length){
        if(cpe.destinatarioCuit){
          if(cpe.destinatarioCuit.length == 11){
            destinatario = this.sel_destinatario.some( (buscar:any) => {return buscar.code == cpe.destinatarioCuit});
          }
        }
      }else{
        destinatario = true
      }
      //transportista
      if(this.transportista.length != this.sel_transportista.length){
        if(cpe.transportistaCuit){
          if(cpe.transportistaCuit.length == 11){
            transportista = this.sel_transportista.some( (buscar:any) => {return buscar.code == cpe.transportistaCuit});
          }
        }
      }else{
        transportista = true
      }
      //corredorprimario
      if(this.corredorprimario.length != this.sel_corredorprimario.length){
        if(cpe.corredorPrimarioCuit){
          if(cpe.corredorPrimarioCuit.length == 11){
            corredorprimario = this.sel_corredorprimario.some( (buscar:any) => {return buscar.code == cpe.corredorPrimarioCuit});
          }
        }
      }else{
        corredorprimario = true
      }
      //corredorsecundario
      corredorsecundario = this.sel_corredorsecundario.some( (buscar:any) => {return buscar.code == cpe.corredorsecundarioCuit});

      if(this.corredorsecundario.length != this.sel_corredorsecundario.length){
        if(cpe.corredorsecundarioCuit){
          if(cpe.corredorsecundarioCuit.length == 11){
            corredorsecundario = this.sel_corredorsecundario.some( (buscar:any) => {return buscar.code == cpe.corredorsecundarioCuit});
          }
        }
      }else{
        corredorsecundario = true
      }
      //representante
      if(this.representante.length != this.sel_representante.length){
        if(cpe.representanteCuit){
          if(cpe.representanteCuit.length == 11){
            representante = this.sel_representante.some( (buscar:any) => {return buscar.code == cpe.representanteCuit});
          }
        }
      }else{
        representante = true
      }
      //representanterecibidor
      if(this.representanterecibidor.length != this.sel_representanterecibidor.length){
        if(cpe.representanteRecibidorCuit){
          if(cpe.representanteRecibidorCuit.length == 11){
            representanterecibidor = this.sel_representanterecibidor.some( (buscar:any) => {return buscar.code == cpe.representanteRecibidorCuit});
          }
        }
      }else{
        representanterecibidor = true;
      }
      //remitenteprimario
      if(this.remitenteprimario.length != this.sel_remitenteprimario.length){
        if(cpe.remitenteComPrimarioCuit){
          if(cpe.remitenteComPrimarioCuit.length == 11){
            remitenteprimario = this.sel_remitenteprimario.some( (buscar:any) => {return buscar.code == cpe.remitenteComPrimarioCuit});
          }
        }
      }else{
        remitenteprimario = true;
      }
      //intermediario
      if(this.intermediario.length != this.sel_intermediario.length){
        if(cpe.intermediarioCuit){
          if(cpe.intermediarioCuit.length == 11){
            intermediario = this.sel_intermediario.some( (buscar:any) => {return buscar.code == cpe.intermediarioCuit});
          }
        }
      }else{
        intermediario = true;
      }

      let coincide_pdf_descarga = false;
      let coincide_existe_synagro = false;
      let coincide_synagro_cero = false;
      let coincide_grano = false;
      let coincide_estado = false;

      //incluido en PDF Descarga
      if(this.cpeDescarga[cpe.ctg]){
        if(this.selectedPDFDescarga.includes('con_descarga')){
          coincide_pdf_descarga = true
        }
      }else{
        if(this.selectedPDFDescarga.includes('sin_descarga')){
          coincide_pdf_descarga = true
        }
      }
      
      //GRANOS
      coincide_grano = this.selectedGranos.includes(cpe.grnCodigo)

      //ESTADO
      coincide_estado = this.selectedEstados.includes(cpe.estado)

      //AGREGAR DATOS:
      cpe['cpe'] = this.cpeDescarga[cpe.ctg] ? this.cpeDescarga[cpe.ctg].nro_cp : null
      cpe['kg_destino'] = this.cpeDescarga[cpe.ctg] ? this.cpeDescarga[cpe.ctg].kg_destino : null
      cpe['kg_tara_dest'] = this.cpeDescarga[cpe.ctg] ? this.cpeDescarga[cpe.ctg].kg_tara : null
      cpe['kg_neto_dest'] = this.cpeDescarga[cpe.ctg] ? this.cpeDescarga[cpe.ctg].kg_neto_dest : null

      //synagro
      let datoSynagro = this.produccionSynagro.find( (e:any) => { return e.nro_ctg == cpe.ctg})
      

      //Existe en Synagro
      if(datoSynagro){
        if(this.selectedSynagro.includes('con_synagro')){
          coincide_existe_synagro = true
    
          if(parseFloat(datoSynagro.kg_neto_dest) == 0){
            if(this.selectedSynagro.includes('igual_cero')){
              coincide_synagro_cero = true
            }
          }else{
            if(this.selectedSynagro.includes('distinto_cero')){
              coincide_synagro_cero = true // es para sacar los que estan en cero.
            }
          }
        }
      }else{
        if(this.selectedSynagro.includes('sin_synagro')){
          coincide_existe_synagro = true
          coincide_synagro_cero = true
        }
      }

      if(datoSynagro){
        cpe['synagro_kg_neto_dest'] = datoSynagro.kg_neto_dest
        cpe['synagro_kg_neto_orig'] = datoSynagro.kg_neto_orig
      }


      if(
        coincide_socio &&
        coincide_socio &&
        coincide_fechaEmision &&
        coincide_fechaVto &&
        destino &&
        destinatario &&
        transportista &&
        corredorprimario &&
        corredorsecundario &&
        representante &&
        representanterecibidor &&
        remitenteprimario &&
        intermediario &&
        coincide_grano &&
        coincide_pdf_descarga &&
        coincide_existe_synagro &&
        coincide_synagro_cero &&
        coincide_estado
      ){
        this.datosTabla.push(cpe)
      }
    });
    this.calcularTotales()
  }

  calcularTotales(){
    this.contadorSumados = {
      pesoBruto: 0,
      pesoTara: 0,
      pesoCargaCalculado: 0,
      kg_destino: 0,
      kg_tara_dest: 0,
      kg_neto_dest: 0,
      synagro_kg_neto_orig: 0,
      synagro_kg_neto_dest: 0
    };
    this.contadorNoSumados = {
      pesoBruto: 0,
      pesoTara: 0,
      pesoCargaCalculado: 0,
      kg_destino: 0,
      kg_tara_dest: 0,
      kg_neto_dest: 0,
      synagro_kg_neto_orig: 0,
      synagro_kg_neto_dest: 0
    };
    this.totales = {
      pesoBruto: 0,
      pesoTara: 0,
      pesoCargaCalculado: 0,
      kg_destino: 0,
      kg_tara_dest: 0,
      kg_neto_dest: 0,
      synagro_kg_neto_orig: 0,
      synagro_kg_neto_dest: 0
    };

    this.datosTabla.map((dato:any)=>{
      let pesoBruto = parseFloat(dato.pesoBruto)
      if(pesoBruto){
        this.contadorSumados.pesoBruto++;
        this.totales.pesoBruto += pesoBruto
      }else{
        this.contadorNoSumados.pesoBruto++;
      }

      let pesoTara = parseFloat(dato.pesoTara)
      if(pesoTara){
        this.contadorSumados.pesoTara++;
        this.totales.pesoTara += pesoTara
      }else{
        this.contadorNoSumados.pesoTara++;
      }

      let pesoCargaCalculado = parseFloat(dato.pesoCargaCalculado)
      if(pesoCargaCalculado){
        this.contadorSumados.pesoCargaCalculado++;
        this.totales.pesoCargaCalculado += pesoCargaCalculado
      }else{
        this.contadorNoSumados.pesoCargaCalculado++;
      }

      let kg_destino = parseFloat(dato.kg_destino)
      if(kg_destino){
        this.contadorSumados.kg_destino++;
        this.totales.kg_destino += kg_destino
      }else{
        this.contadorNoSumados.kg_destino++;
      }

      let kg_tara_dest = parseFloat(dato.kg_tara_dest)
      if(kg_tara_dest){
        this.contadorSumados.kg_tara_dest++;
        this.totales.kg_tara_dest += kg_tara_dest
      }else{
        this.contadorNoSumados.kg_tara_dest++;
      }

      let kg_neto_dest = parseFloat(dato.kg_neto_dest)
      if(kg_neto_dest){
        this.contadorSumados.kg_neto_dest++;
        this.totales.kg_neto_dest += kg_neto_dest
      }else{
        this.contadorNoSumados.kg_neto_dest++;
      }

      let synagro_kg_neto_orig = parseFloat(dato.synagro_kg_neto_orig)
      if(synagro_kg_neto_orig){
        this.contadorSumados.synagro_kg_neto_orig++;
        this.totales.synagro_kg_neto_orig += synagro_kg_neto_orig
      }else{
        this.contadorNoSumados.synagro_kg_neto_orig++;
      }

      let synagro_kg_neto_dest = parseFloat(dato.synagro_kg_neto_dest)      
      if(synagro_kg_neto_dest){
        this.contadorSumados.synagro_kg_neto_dest++;
        this.totales.synagro_kg_neto_dest += synagro_kg_neto_dest
      }else{
        this.contadorNoSumados.synagro_kg_neto_dest++;
      }
    })
  }

  mostrarNumero(ent:any, dec:any){
    if(parseFloat(ent)){
      return new Intl.NumberFormat('de-DE').format(ent.toFixed(dec))
    }
    return "-";
  }
}



/* 
Tabla cpe

destino
destinatarioCuit
transportistaCuit
corredorPrimarioCuit
corredorsecundarioCuit
representanteCuit
representanteRecibidorCuit
remitenteComPrimarioCuit
intermediarioCuit

id
socio
tipo_cpe
cpe
estado
fechaEmision
fechaVencimiento
procedenciaPlanta
procedenciaCodLocalidad
destinoCuit
destinoPlanta
destinoCodLocalidad
destinatarioCuit
transportistaCuit
transportista2Cuit
trenNroVagon
trenNroOperativo
numeroPrecinto
dominios
fletePagadorCuit
grnCodigo
pesoBruto
pesoTara
pesoCargaCalculado
remitenteComPrimarioCuit
intermediarioCuit
corredorPrimarioCuit
corredorSecundarioCuit
transportistaCuit2
representanteCuit
representanteRecibidorCuit
intermediarioFleteCuit


""



 */