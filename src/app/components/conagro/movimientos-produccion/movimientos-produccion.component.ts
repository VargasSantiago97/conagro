import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-movimientos-produccion',
  templateUrl: './movimientos-produccion.component.html',
  styleUrls: ['./movimientos-produccion.component.css']
})
export class MovimientosProduccionComponent implements OnInit {

  spinnerProduccion: Boolean = true;
  spinnerProduccionOrigen: Boolean = true;
  spinnerEstablecimiento: Boolean = true;
  spinnerLotes: Boolean = true;
  spinnerLoteActividad: Boolean = true;
  spinnerDestinos: Boolean = true;

  produccion: any = [];
  produccionOrigen: any = [];
  establecimiento: any = [];;
  lotes: any = [];
  codLoteActividad: any = [];
  destinos: any = [];

  DIC_establecimiento: any = {};
  DIC_codLoteActividad: any = {};
  DIC_lotes: any = {};
  DIC_destinos: any = {};
  
  DIC_tipo_dest: any = {1: 'Cliente', 2: 'Silo', 3: 'Acopio'};


  //FILTROS:
  periodo: any = 4;
  cultivo: any = 2;
  
  //PARA OPERACIONES
  dataCruda: any = [];
  dataKilos: any = [];
  dataPorCampos: any = {};
  dataTabla: any = [];

  dataSilos: any = []

  cols: any = [];
  selectedColumns: any = [];

  constructor(private comunicacionService : ComunicacionService) { }

  ngOnInit(): void {

    this.cols = [
      {field: "cod_dest", header: "Cod. Dest."},
      {field: "tipo_dest", header: "Tipo Dest."},
      {field: "nombre_dest", header: "Destino"},
      {field: "cod_lote_actividad", header: "Cod. Lot/Act"},
      {field: "cod_lote", header: "Cod. Lote"},
      {field: "nombre_lote", header: "Lote"},
      {field: "cod_establecimiento", header: "Cod. Est."},
      {field: "nombre_establecimiento", header: "Establec."},
      {field: "kg_neto_orig", header: "Kg Neto Origen"},
      {field: "lote", header: "Cod. Lote"},
      {field: "tipo_origen", header: "Tipo Origen"}
    ];
    this.selectedColumns = [
      {field: "nombre_establecimiento", header: "Establec."},
      {field: "nombre_lote", header: "Lote"},
      {field: "cod_lote_actividad", header: "Cod. Lot/Act"},

      {field: "tipo_dest", header: "Tipo Dest."},
      {field: "nombre_dest", header: "Destino"},

      {field: "kg_neto_orig", header: "Kg Neto Origen"},
    ];


    this.obtenerTodosProduccion();
    this.obtenerTodosProduccionOrigen();
    this.obtenerTodosEstablecimiento();
    this.obtenerTodosLoteActividad();
    this.obtenerTodosLotes();
    this.obtenerTodosDestinos();
  }

  obtenerTodosProduccion(){
    this.comunicacionService.obtenerTodosProduccion().subscribe(
      (res:any) => {
        this.produccion = [ ...res ]
        this.spinnerProduccion = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }
  obtenerTodosProduccionOrigen(){
    this.comunicacionService.obtenerTodosProduccionOrigen().subscribe(
      (res:any) => {
        this.produccionOrigen = [ ...res ]
        this.spinnerProduccionOrigen = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }
  obtenerTodosEstablecimiento(){
    this.comunicacionService.obtenerTodosEstablecimiento().subscribe(
      (res:any) => {
        this.DIC_establecimiento = {}
        this.establecimiento = [ ...res ]
        res.map((e:any)=>{
          this.DIC_establecimiento[e.codigo] = e;
        })
        this.spinnerEstablecimiento = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }
  obtenerTodosLotes() {
    this.comunicacionService.obtenerTodosLotes().subscribe(
        (res: any) => {
          this.DIC_lotes = {}
          this.lotes = [...res];
          res.map((e:any)=>{
            this.DIC_lotes[e.codigo] = e;
          })
          this.spinnerLotes = false;
        },
        err => {
            console.log(err);
        }
    );
  };
  obtenerTodosLoteActividad(){
    this.comunicacionService.obtenerTodosLoteActividad().subscribe(
      (res:any) => {
        this.DIC_codLoteActividad = {}
        this.codLoteActividad = [ ...res ]
        res.map((e:any)=>{
          this.DIC_codLoteActividad[e.codigo] = e;
        })
        this.spinnerLoteActividad = false;
      },
      (err:any) => {
        console.log(err)
      }
    )
  }
  obtenerTodosDestinos() {
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          this.DIC_destinos = {};
          this.destinos = [...res];
          res.map((e:any)=>{
            this.DIC_destinos[e.codigo] = e;
          })
          this.spinnerDestinos = false;
        },
        err => {
            console.log(err);
        }
    );
  };


  crearObjetoCrudo(){
    this.dataCruda = [];
    this.dataKilos = [];
    this.dataSilos = [];
    this.dataPorCampos = {};
    this.dataTabla = [];

    var sumatoriaKilos = {};

    //Filtramos por CAMPAÑA y CULTIVO
    this.produccion.map((registro:any) => {
      var coincidePeriodo = registro.cod_periodo == this.periodo
      var coincideCultivo = registro.AREA == this.cultivo

      if(coincidePeriodo && coincideCultivo){
        this.dataCruda.push(registro)
      }
    })

    //CREAMOS ARRAY CON DATOS. ACOMODANDO LOS 'MULTIPLES' Y CREAMOS LOS DATOS DE CARGA DE SILOS
    this.dataCruda.map((registro:any) => {
      if (registro.tipo_origen == 'M'){
        var origen = this.produccionOrigen.filter((e:any) => {
          return e.id_produccion == registro.id
        })
        origen.map( (e:any) => {
          if(e.tipo_origen == 'L'){
            this.dataKilos.push({
              numero: registro.numero,
              id: e.id,
              cod_dest: registro.cod_dest,
              tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
              nombre_dest: this.DIC_destinos[registro.cod_dest].nombre,
              cod_lote_actividad: e.cod_lote_actividad,
              cod_lote: this.DIC_codLoteActividad[e.cod_lote_actividad].cod_lote,
              nombre_lote: this.DIC_lotes[this.DIC_codLoteActividad[e.cod_lote_actividad].cod_lote].descrip,
              cod_establecimiento: this.DIC_codLoteActividad[e.cod_lote_actividad].cod_establecimiento,
              nombre_establecimiento: this.DIC_establecimiento[this.DIC_codLoteActividad[e.cod_lote_actividad].cod_establecimiento].nombre,
              kg_neto_orig: e.kg_origen,
              lote: registro.lote,
              tipo_origen: 'L'
            })
          }  else if(e.tipo_origen == 'S'){
            if(this.dataSilos.some((f:any)=>{return f.cod_silo == e.origen})){
              //sumamos
              var dataSilo = this.dataSilos.find((f:any) => { return f.cod_silo == e.origen })
              dataSilo.kg_descarga += parseFloat(e.kg_origen)
             }else{
                //creamos
                this.dataSilos.push({
                  cod_silo: e.origen,
                  nombre: this.DIC_destinos[e.origen].nombre,
                  kg_carga: 0,
                  kg_descarga: parseFloat(e.kg_origen)
                })
              }
          }
        })
      }else if (registro.tipo_origen == 'L'){
        this.dataKilos.push({
          numero: registro.numero,
          id: registro.id,
          cod_dest: registro.cod_dest,
          tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
          nombre_dest: this.DIC_destinos[registro.cod_dest].nombre,
          cod_lote_actividad: registro.cod_lote_actividad,
          cod_lote: this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_lote,
          nombre_lote: this.DIC_lotes[this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_lote].descrip,
          cod_establecimiento: this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento,
          nombre_establecimiento: this.DIC_establecimiento[this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento].nombre,
          kg_neto_orig: registro.kg_neto_orig,
          lote: registro.lote,
          tipo_origen: 'L'
        })
      }else if (registro.tipo_origen == 'S'){
        //SILO
        /* 
        dataSilos: any = [
          {
            cod_silo: 229,
            nombre: 'BOLSON DON JUAN MAIZ',
            kg_carga: 123,
            kg_descarga: 321
          }
        ]
        */
       if(this.dataSilos.some((e:any)=>{return e.cod_silo == registro.origen})){
        //sumamos
        var dataSilo = this.dataSilos.find((e:any) => { return e.cod_silo == registro.origen })
        dataSilo.kg_descarga += parseFloat(registro.kg_neto_orig)

       }else{
        //creamos
        this.dataSilos.push({
          cod_silo: registro.origen,
          nombre: this.DIC_destinos[registro.origen].nombre,
          kg_carga: 0,
          kg_descarga: parseFloat(registro.kg_neto_orig)
        })
       }
      }
    })

    //DATOS DE DESCARGA DE SILOS
    this.dataCruda.map((registro:any) => {

      if (this.DIC_destinos[registro.cod_dest].id_tipo_destino == 2){
        
        if(this.dataSilos.some((e:any)=>{return e.cod_silo == registro.cod_dest})){
          //sumamos
          var dataSilo = this.dataSilos.find((e:any) => { return e.cod_silo == registro.cod_dest })
          dataSilo.kg_carga += parseFloat(registro.kg_neto_dest)

         }else{
          //creamos
          this.dataSilos.push({
            cod_silo: registro.cod_dest,
            nombre: this.DIC_destinos[registro.cod_dest].nombre,
            kg_carga: parseFloat(registro.kg_neto_dest),
            kg_descarga: 0
          })
          console.log(registro)
        }
      }
    })


    //SEPARAR POR ESTABLECIMEINTO
    this.dataKilos.map((registro:any)=>{
      if(!this.dataPorCampos[registro.cod_establecimiento]){
        this.dataPorCampos[registro.cod_establecimiento] = {};
      }

      if(!this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote]){
        this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote] = {silo: {}, cliente: {}, acopio: {}}
      }


      if(registro.tipo_dest == 1){
        if(!this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].cliente[registro.cod_dest]){
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].cliente[registro.cod_dest] = [registro]
        } else {
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].cliente[registro.cod_dest].push(registro)
        }
      }

      if(registro.tipo_dest == 2){
        if(!this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].silo[registro.cod_dest]){
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].silo[registro.cod_dest] = [registro]
        } else {
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].silo[registro.cod_dest].push(registro)
        }
      }

      if(registro.tipo_dest == 3){
        if(!this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].acopio[registro.cod_dest]){
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].acopio[registro.cod_dest] = [registro]
        } else {
          this.dataPorCampos[registro.cod_establecimiento][registro.cod_lote].acopio[registro.cod_dest].push(registro)
        }
      }
    })

    this.dataKilos
      .sort((a:any, b:any) => {return a.cod_dest - b.cod_dest})
      .sort((a:any, b:any) => {return a.tipo_dest - b.tipo_dest})
      .sort((a:any, b:any) => {return a.cod_lote_actividad - b.cod_lote_actividad})
      .sort((a:any, b:any) => {return a.cod_lote - b.cod_lote})
      .sort((a:any, b:any) => {return a.cod_establecimiento - b.cod_establecimiento})
    ;



    //DATOS PARA TABLA
    this.dataKilos.map((registro:any)=>{
      if(!this.dataTabla.some((e:any) => {return e.cod_establecimiento == registro.cod_establecimiento})){
        this.dataTabla.push({
          cod_establecimiento: registro.cod_establecimiento,
          nombre_establecimiento: registro.nombre_establecimiento,
          total_kgs: parseFloat(registro.kg_neto_orig),
          datos: [],
          silos: []
        })
      }else{
        this.dataTabla.find((e:any) => {return e.cod_establecimiento == registro.cod_establecimiento}).total_kgs += parseFloat(registro.kg_neto_orig)
      }


      var datos = this.dataTabla.find((e:any) => {return e.cod_establecimiento == registro.cod_establecimiento}).datos

      if(!datos.some((e:any) => {return e.cod_lote == registro.cod_lote})){
        datos.push({
          cod_lote: registro.cod_lote,
          nombre_lote: registro.nombre_lote,
          total_kgs: parseFloat(registro.kg_neto_orig),
          datos: [],
        })
      }else{
        datos.find((e:any) => {return e.cod_lote == registro.cod_lote}).total_kgs += parseFloat(registro.kg_neto_orig)
      }


      var datos2 = datos.find((e:any) => {return e.cod_lote == registro.cod_lote}).datos

      if(!datos2.some((e:any) => {return e.tipo_dest == registro.tipo_dest})){
        datos2.push({
          tipo_dest: registro.tipo_dest,
          nombre_tipo_dest: this.DIC_tipo_dest[registro.tipo_dest],
          total_kgs: parseFloat(registro.kg_neto_orig),
          datos: []
        })
      } else {
        datos2.find((e:any) => {return e.tipo_dest == registro.tipo_dest}).total_kgs += parseFloat(registro.kg_neto_orig)
      }


      var datos3 = datos2.find((e:any) => {return e.tipo_dest == registro.tipo_dest}).datos

      if(!datos3.some((e:any) => {return e.cod_dest == registro.cod_dest})){
        datos3.push({
          cod_dest: registro.cod_dest,
          nombre_dest: registro.nombre_dest,
          total_kgs: parseFloat(registro.kg_neto_orig),
        })
      } else {
        datos3.find((e:any) => {return e.cod_dest == registro.cod_dest}).total_kgs += parseFloat(registro.kg_neto_orig)
      }

      if(datos2.some((e:any) => {return e.tipo_dest == registro.tipo_dest && e.tipo_dest == 2})){
        var data5 = this.dataTabla.find((e:any) => {return e.cod_establecimiento == registro.cod_establecimiento}).silos
        if(!data5.some((e:any)=>{return e == registro.cod_dest})){
          data5.push(registro.cod_dest)
        }
      }
    })
  
    /*
    {
      cod_dest: registro.cod_dest,
      tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
      nombre_dest: this.DIC_destinos[registro.cod_dest].nombre,
      cod_lote_actividad: registro.cod_lote_actividad,
      cod_lote: this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_lote,
      nombre_lote: this.DIC_lotes[this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_lote].descrip,
      cod_establecimiento: this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento,
      nombre_establecimiento: this.DIC_establecimiento[this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento].nombre,
      kg_neto_orig: registro.kg_neto_orig,
      lote: registro.lote,
      tipo_origen: 'L'
    }
    */


    console.log(this.dataTabla)



    /* 

    1">Cliente
    2">Silo
    3">Acopio

    cod_dest
    cod_lote_actividad
    kg_neto_dest
    kg_neto_orig
    lote
    tipo_origen
    */

    //console.log(this.dataCruda)
  }

  transformarDatoMostrar(dato: any, tipo:any){
    if(tipo == 'tipo_dest'){
      return this.DIC_tipo_dest[dato];
    }
    if(tipo == 'kilos'){
      return dato.toLocaleString('es-AR');
    }

    if(tipo == 'nombreSilo'){
      if(this.dataSilos.some((e:any)=>{ return e.cod_silo == dato })){
        return this.dataSilos.find((e:any)=>{ return e.cod_silo == dato }).nombre
      }else{
        return '[Sin dato]'
      }
    }
    if(tipo == 'kilosCargaSilo'){
      if(this.dataSilos.some((e:any)=>{ return e.cod_silo == dato })){
        return this.dataSilos.find((e:any)=>{ return e.cod_silo == dato }).kg_carga.toLocaleString('es-AR');
      }else{
        return '[Sin dato]'
      }
    }
    if(tipo == 'kilosDescargaSilo'){
      if(this.dataSilos.some((e:any)=>{ return e.cod_silo == dato })){
        return this.dataSilos.find((e:any)=>{ return e.cod_silo == dato }).kg_descarga.toLocaleString('es-AR');
      }else{
        return '[Sin dato]'
      }
    }
    if(tipo == 'diferenciaSilo'){
      if(this.dataSilos.some((e:any)=>{ return e.cod_silo == dato })){
        var datosSilo = this.dataSilos.find((e:any)=>{ return e.cod_silo == dato })

        var kilos = parseFloat(datosSilo.kg_carga) - parseFloat(datosSilo.kg_descarga);
        var porcentaje = kilos/parseFloat(datosSilo.kg_carga)*100;
  
        return `${kilos.toLocaleString('es-AR')}kgs. (${porcentaje.toLocaleString('es-AR')}%)`
      }else{
        return '[Sin dato]'
      }
    }



    return dato;
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