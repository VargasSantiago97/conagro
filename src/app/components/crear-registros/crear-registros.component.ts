import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-crear-registros',
  templateUrl: './crear-registros.component.html',
  styleUrls: ['./crear-registros.component.css']
})
export class CrearRegistrosComponent implements OnInit {

  datosExcel: any = [];

  displayBasic: Boolean = false;

  datosAdicionales: any = {
    cod_periodo: 4, //campaña
    usuario: "SANTIAGO",
    fecha_carga: "",

    kg_neto_co: null,
    destino: null,
    precio: null,
    gasto_flete: null,
    patente_camion: null,
    patente_acoplado: null,
    nombre_chofer: null,
    cuit_chofer: null,
    cod_chofer: null,

    tipo_grano: null,
    cod_corredor: null,
    cod_representante: null,
    cod_asignador_cupo: null,
    gasto_acondicionamiento: null,
    gasto_comercializacion: null,

    cod_cuentayorden1: null,
    cod_cuentayorden2: null,

    tipo: null,
    id_pc: null,
    proc_calle: null,
    proc_nro: null,
    proc_codpostal: null,
    proc_localidad: null,
    proc_depto: null,
    proc_provincia: null,

    fecha_cupo: null,

    id_contrato: null,
    id_contratista: null,
    marca_importacion: null,
    origen_importacion: null,
    neto_afip: null,
    tipo_transporte: "S",
    id_stock_campo: null,

    hora_carga: "",
  };

  desactivarVerificar: Boolean = true;
  permitirTablaCrear: Boolean = false;

  patentes: any = {};
  destinos: any = {};
  loteActividad: any = {};

  erroresParaRegistrar: any = [];
  advertenciasParaRegistrar: any = [];

  datosProduccion: any = [];

  datosProduccionCTG: any = [];
  ultimoNumeroCreado = 0;
  ultimoIDCreado = 0;
  creandoRegistro = 0;

  logRegistros: any = []


  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    const hoy = new Date();
    this.datosAdicionales['fecha_carga'] = hoy.toISOString().slice(0, 10);
    this.datosAdicionales['hora_carga'] = hoy.toLocaleTimeString();

    this.obtenerTodosProveedores();
    this.obtenerTodosDestinos();
    this.obtenerTodosLoteActividad();
    this.obtenerTodosProduccion();

  }

  obtenerTodosProveedores() {
    this.comunicacionService.obtenerTodosProveedores().subscribe(
        (res: any) => {
          this.patentes = {}
          res.map( (e:any) => {
            this.patentes[e.nombre] = e.cod_proveedor
          })
        },
        err => {
            console.log(err);
        }
    );
  };

  obtenerTodosDestinos() {
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          this.destinos = {}
          res.map( (e:any) => {
            this.destinos[e.nombre] = e.codigo
          })
        },
        err => {
            console.log(err);
        }
    );
  };

  obtenerTodosLoteActividad() {
    this.comunicacionService.obtenerTodosLoteActividad().subscribe(
        (res: any) => {
          this.loteActividad = {}
          res.map( (e:any) => {
            this.loteActividad[e.codigo] = { ... e}
          })
        },
        err => {
            console.log(err);
        }
    );
  };

  obtenerTodosProduccion() {
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.datosProduccionCTG = [ ...res, {nro_ctg:''}, {nro_ctg:null} ]
        },
        err => {
          console.log(err);
        }
    );
  };

  obtenerUltimoNumero() {
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          res.map((e:any) => {
            if(this.ultimoNumeroCreado < parseInt(e.numero)) this.ultimoNumeroCreado = parseInt(e.numero);
          })
        },
        err => {
          console.log(err);
        }
    );
  };

  obtenerUltimoSecuencia(){
    this.comunicacionService.obtenerTodosSecuencia().subscribe(
      (res:any) => {
        this.ultimoIDCreado = parseInt(res[0].secuencia)
      },
      (err:any) => {
        console.log(err);
      }
    )
  }

  traerDatosExcel() {
    this.comunicacionService.traerDatosExcelCrear().subscribe(
        (res: any) => {
          this.datosExcel = [...res];
          this.desactivarVerificar = false;
        },
        err => {
            console.log(err);
        }
    );
  };

  verificarDatos(){
    var leyendoLinea = 2
    this.erroresParaRegistrar = []
    this.desactivarVerificar = true;

    this.datosExcel.map( (excel:any) => {

      var patente;
      var destino;
      var descarga;
      var cod_origen_lote = null;
      var cod_origen_silo = null;
      var lote = null;
      var lotesilo = "";

      this.patentes[excel.transporte] ? patente = this.patentes[excel.transporte] 
      : this.erroresParaRegistrar.push({error: `PATENTE: ${excel.transporte} no encontrada.`, linea:leyendoLinea, error_tipo:'patente'})

      this.destinos[excel.destino] ? destino = this.destinos[excel.destino] 
      : this.erroresParaRegistrar.push({error: `DESTINO: ${excel.destino} no encontrada.`, linea:leyendoLinea, error_tipo:'destino'})

      this.destinos[excel.descarga] ? descarga = this.destinos[excel.descarga] 
      : this.erroresParaRegistrar.push({error: `DESCARGA: ${excel.descarga} no encontrada.`, linea:leyendoLinea, error_tipo:'descarga'})


      if(excel.ls == "L"){
        if(this.loteActividad[excel.cod_origen]){
          cod_origen_lote = excel.cod_origen;
          lote = this.loteActividad[excel.cod_origen].cod_lote;
          lotesilo = `Lot/Act. ${cod_origen_lote} - Lote ${lote}`;
        } else {
          this.erroresParaRegistrar.push({error: `ORIGEN: Lote ${excel.cod_origen} no encontrado.`, linea:leyendoLinea, error_tipo:'origenLote'});
        }

      } else if(excel.ls == "S"){
        this.destinos[excel.lotesilo] ? cod_origen_silo = this.destinos[excel.lotesilo]
        : this.erroresParaRegistrar.push({error: `ORIGEN: Silo ${excel.lotesilo} no encontrado.`, linea:leyendoLinea, error_tipo:'origenSilo'})
        lotesilo = excel.lotesilo
      } else {
        this.erroresParaRegistrar.push({error: `L/S: No informados si es lote o silo en columna "AL".`, linea:leyendoLinea, error_tipo:'lotesilo'})
      }

      if(this.datosProduccionCTG.some((e:any) => {return e.nro_ctg == excel.nro_ctg})){
        if(excel.nro_ctg != '' && excel.nro_ctg != 0 && excel.nro_ctg != null){
          this.advertenciasParaRegistrar.push({advertencia: `Ya existe CTG N° ${excel.nro_ctg}`, linea:leyendoLinea, detalle:''})
        }
      }



      this.datosProduccion.push({
        AREA : excel.AREA,  //"4"
        chamico : excel.chamico,  //"0.00"
        cod_asignador_cupo : this.datosAdicionales.cod_asignador_cupo,  //null
        cod_chofer : this.datosAdicionales.cod_chofer,  //null
        cod_corredor : this.datosAdicionales.cod_corredor,  //null
        cod_cuentayorden1 : this.datosAdicionales.cod_cuentayorden1,  //null
        cod_cuentayorden2 : this.datosAdicionales.cod_cuentayorden2,  //null
        cod_dest : destino,  //"10"
        cod_dest_descarga : descarga,  //"10"
        cod_lote_actividad : cod_origen_lote,  //"54"
        cod_periodo : this.datosAdicionales.cod_periodo,  //"2"
        cod_representante : this.datosAdicionales.cod_representante,  //null
        cuerp_ext : excel.cuerp_ext,  //"0.00"
        cuit_chofer : this.datosAdicionales.cuit_chofer,  //null
        daniados : excel.daniados,  //"0.00"
        destino : this.datosAdicionales.destino,  //null
        diferencia : excel.diferencia,  //"122.0000"
        distancia : excel.distancia,  //null
        factor : excel.factor,  //"98.58"
        fecha : excel.fecha,  //"2020-01-03"
        fecha_carga : this.datosAdicionales.fecha_carga,  //"2020-03-05"
        fecha_cupo : this.datosAdicionales.fecha_cupo,  //null
        finca : excel.finca,  //null
        gasto_acondicionamiento : this.datosAdicionales.gasto_acondicionamiento,  //null
        gasto_comercializacion : this.datosAdicionales.gasto_comercializacion,  //null
        gasto_flete : this.datosAdicionales.gasto_flete,  //null
        hora_carga : this.datosAdicionales.hora_carga,  //"11:38:14"
        humedad1 : excel.humedad1,  //"0.0"
        humedad2 : excel.humedad2,  //"0.0"
        id : 0,  //"5931567"
        id_contratista : this.datosAdicionales.id_contratista,  //null
        id_contrato : this.datosAdicionales.id_contrato,  //null
        id_pc : this.datosAdicionales.id_pc,  //null
        id_stock_campo : this.datosAdicionales.id_stock_campo,  //null
        kg_bruto_origen : excel.kg_origen,  //"30400.0000"
        kg_destino : excel.kg_destino,  //"30278.000"
        kg_neto_co : this.datosAdicionales.kg_neto_co,  //null
        kg_neto_dest : excel.kg_neto_dest,  //"29848.0524"
        kg_neto_orig : excel.kg_neto_orig,  //"30400.0000"
        kg_origen : excel.kg_origen,  //"30400.0000"
        kg_tara_origen : 0,  //"0"
        lote : lote,  //"37"
        marca_importacion : this.datosAdicionales.marca_importacion,  //null
        neto_afip : this.datosAdicionales.neto_afip,  //null
        nombre_chofer : this.datosAdicionales.nombre_chofer,  //null
        nro_cp : excel.nro_cp,  //"581774136"
        nro_ctg : excel.nro_ctg,  //null
        numero : 0,  //"102"
        observar : excel.observar,  //null
        origen : cod_origen_silo,  //null
        origen_importacion : this.datosAdicionales.origen_importacion,  //null
        otros : excel.otros,  //"0.00"
        patente_acoplado : this.datosAdicionales.patente_acoplado,  //null
        patente_camion : this.datosAdicionales.patente_camion,  //null
        pcio_flete : excel.pcio_flete,  //null
        precio : this.datosAdicionales.precio,  //null
        proc_calle : this.datosAdicionales.proc_calle,  //null
        proc_codpostal : this.datosAdicionales.proc_codpostal,  //null
        proc_depto : this.datosAdicionales.proc_depto,  //null
        proc_localidad : this.datosAdicionales.proc_localidad,  //null
        proc_nro : this.datosAdicionales.proc_nro,  //null
        proc_provincia : this.datosAdicionales.proc_provincia,  //null
        quebrados : excel.quebrados,  //"0.00"
        remito : excel.remito,  //null
        romaneo : excel.romaneo,  //null
        tierra : excel.tierra,  //"0.00"
        tipo : this.datosAdicionales.tipo,  //null
        tipo_grano : this.datosAdicionales.tipo_grano,  //null
        tipo_origen : excel.ls,  //"L"
        tipo_transporte : this.datosAdicionales.tipo_transporte,  //"S"
        transporte : patente,  //null
        usuario : this.datosAdicionales.usuario,  //"ADMIN"
        variedad : excel.variedad,  //null
        volatil : excel.volatil,  //"0.00"
        zaranda : excel.zaranda,  //"0.00"

        //registros sistema:
        lotesilo: lotesilo,
        patente: `${excel.transporte} - (${patente})`
      });

      leyendoLinea++;
    })
    if(this.erroresParaRegistrar.length == 0){
      this.permitirTablaCrear = true;
    }
  }



  /* 
  ###########################################
  ##########    CREAR REGISTROS    ##########
  ###########################################
  */

  confirmarCrearRegistros(){  
    if(confirm('Desea crear estos registros?')){
      this.creandoRegistro = 0;
      this.crearRegistros()
    }
  }

  crearRegistros(){
    if(this.creandoRegistro < this.datosProduccion.length){
      //crear
      let datoAEnviar:any = {...this.datosProduccion[this.creandoRegistro]}

      datoAEnviar['id'] = this.ultimoIDCreado + 1 + this.creandoRegistro
      datoAEnviar['numero'] = this.ultimoNumeroCreado + 1 + this.creandoRegistro

      this.creandoRegistro++;

      this.crearRegistro(datoAEnviar);
    } else {
      //enviar secuencia
      this.comunicacionService.editarSecuencia({secuencia: this.ultimoIDCreado + this.creandoRegistro}).subscribe(
        (res:any) => {
          setTimeout(() => {
            alert('Terminado');
          }, 50);
        },
        (err:any) => {
          alert('Error registrando SECUENCIA');
          console.log(err);
        }
      )
    }
  }

  crearRegistro(data : any){
    this.comunicacionService.crearProduccion(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - Creado correctamente', ok:true, codigo: data.numero});
        this.crearRegistros();
      },
      err => {
          console.log(err);
          console.log("\n\nIntentando nuevamente...");
          this.creandoRegistro--;
          this.crearRegistros();
          this.logRegistros.push({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.numero});
      }
    );
  }
}