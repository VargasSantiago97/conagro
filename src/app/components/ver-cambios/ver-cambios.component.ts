import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-ver-cambios',
  templateUrl: './ver-cambios.component.html',
  styleUrls: ['./ver-cambios.component.css']
})
export class VerCambiosComponent implements OnInit {

  datosExcel: any = [];
  produccion: any = [];
  datosAModificar: any = [];
  datosAModificarEnviar: any = [];

  destinos: any = [];
  patentes: any = [];

  permitir_modificar : Boolean = true;
  permitir_edicion : Boolean = true;

  contadorFilas: number = 0;
  contadorModificaciones: number = 0;
  contadorErrores: number = 0;
  editandoRegistroNro: number = 0;

  logRegistros: any = [];
  spinner : Boolean = false;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosDestinos();
    this.obtenerTodosProveedores();
  }

  obtenerTodosDestinos() {
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          res.map( (e:any) => {
            this.destinos[e.nombre] = e.codigo
          } )
          console.log("🚀 ~ file: ver-cambios.component.ts:33 ~ VerCambiosComponent ~ obtenerTodosDestinos ~ destinos OK")
        },
        err => {
            console.log(err);
        }
    );
  };

  obtenerTodosProveedores() {
    this.comunicacionService.obtenerTodosProveedores().subscribe(
        (res: any) => {
          res.map( (e:any) => {
            this.patentes[e.nombre] = e.cod_proveedor;
          })
          console.log("🚀 ~ file: ver-cambios.component.ts:44 ~ VerCambiosComponent ~ obtenerTodosProveedores ~ proveedores OK")
        },
        err => {
            console.log(err);
        }
    );
  };

  traerDatosExcel() {
    this.comunicacionService.traerDatosExcel().subscribe(
        (res: any) => {
          this.datosExcel = [...res];
        },
        err => {
            console.log(err);
        }
    );
  };

  traerDatosSynagro() {
    this.permitir_modificar = true;
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          this.produccion = [];
          this.datosExcel.map( (e:any) => {
            let varAux = res.find( (f:any) => f.numero == e.numero);
            this.produccion.push(varAux);

            this.permitir_modificar = false;
          })         
        },
        err => {
            console.log(err);
        }
    );
  };

  compararDatos(){
    let datosExcel = this.datosExcel;

    var contadorFilas = 0
    var contadorModificaciones = 0
    var contadorErrores = 0
    

    this.datosAModificar = []

    datosExcel.map( (excel:any) => {
      var produccion = this.produccion.find( (e:any) => e.numero == excel.numero)


      const COIN_patente = this.patentes[excel.transporte] == produccion.transporte ? true : false;

      const COIN_destino = this.destinos[excel.destino] ? true : false;

      const COIN_descarga = this.destinos[excel.descarga] ? true : false;

      const fila_modificar = !(excel.nro_cp == produccion.nro_cp) || !(excel.nro_ctg == produccion.nro_ctg) || !(excel.AREA == produccion.AREA) || !(excel.remito == produccion.remito) || !(excel.kg_origen == produccion.kg_origen) || !(excel.kg_neto_orig == produccion.kg_neto_orig) || !(excel.kg_destino == produccion.kg_destino) || !(excel.kg_neto_dest == produccion.kg_neto_dest) || !(excel.diferencia == produccion.diferencia) || !(excel.humedad1 == produccion.humedad1) || !(excel.humedad2 == produccion.humedad2) || !(excel.factor == produccion.factor) || !(excel.observar == produccion.observar)
      const fila_error = !COIN_patente || !COIN_destino || !COIN_descarga


      contadorFilas++;
      fila_modificar ? contadorModificaciones++ : null;
      fila_error ? contadorErrores++ : null;

      this.datosAModificar.push({
        numero: excel.numero,

        nro_cp: excel.nro_cp,
        COIN_nro_cp: excel.nro_cp == produccion.nro_cp,

        nro_ctg: excel.nro_ctg,
        COIN_nro_ctg: excel.nro_ctg == produccion.nro_ctg,

        AREA: excel.AREA,
        COIN_AREA: excel.AREA == produccion.AREA,

        remito: excel.remito,
        COIN_remito: excel.remito == produccion.remito,

        //datos de la carga
        kg_origen: excel.kg_origen,
        COIN_kg_origen: excel.kg_origen == produccion.kg_origen,

        kg_neto_orig: excel.kg_neto_orig,
        COIN_kg_neto_orig: excel.kg_neto_orig == produccion.kg_neto_orig,

        kg_destino: excel.kg_destino,
        COIN_kg_destino: excel.kg_destino == produccion.kg_destino,

        kg_neto_dest: excel.kg_neto_dest,
        COIN_kg_neto_dest: excel.kg_neto_dest == produccion.kg_neto_dest,

        diferencia: excel.diferencia,
        COIN_diferencia: excel.diferencia == produccion.diferencia,

        humedad1: excel.humedad1,
        COIN_humedad1: excel.humedad1 == produccion.humedad1,

        humedad2: excel.humedad2,
        COIN_humedad2: excel.humedad2 == produccion.humedad2,

        factor: excel.factor,
        COIN_factor: excel.factor == produccion.factor,

        observar: excel.observar,
        COIN_observar: excel.observar == produccion.observar,

        //verificaciones:
        COIN_patente : COIN_patente,
        COIN_destino : COIN_destino,
        COIN_descarga : COIN_descarga,

        fila_modificar : fila_modificar,
        fila_error : fila_error,

        patente: excel.transporte
      })

    })
    this.contadorFilas = contadorFilas;
    this.contadorModificaciones = contadorModificaciones;
    this.contadorErrores = contadorErrores;

    this.permitir_edicion = false;
  }


  async comenzarModificacion(){
    if(confirm(`Desea modificar estos ${this.contadorModificaciones} registros?`)){
      this.permitir_edicion = true;
      this.spinner = true;

      this.datosAModificarEnviar = await this.datosAModificar.filter( (e:any) => e.fila_modificar == true )
      
      this.editandoRegistroNro = 0;

      this.enviarRegistro();
    }
  }

  enviarRegistro(){
    if(this.editandoRegistroNro < this.contadorModificaciones){
      this.editarRegistro(this.datosAModificarEnviar[this.editandoRegistroNro]);

      this.editandoRegistroNro++;
    } else{
      this.spinner = false;
      setTimeout(() => {
        alert('Edicion terminada');
      }, 50);
    }
  }

  editarRegistro(registro:any) {
    this.comunicacionService.editarProduccion(registro).subscribe(
        (res: any) => {
          this.logRegistros.push({registro: registro.numero, mensaje:'EXITO - Edicion Realizada', ok:true});
          this.enviarRegistro();

          console.log(registro)

        },
        err => {
            console.log(err);
            this.logRegistros.push({registro: registro.numero, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false});
        }
    );
  };
}