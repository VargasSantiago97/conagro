import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-crear-destinos',
  templateUrl: './crear-destinos.component.html',
  styleUrls: ['./crear-destinos.component.css']
})
export class CrearDestinosComponent implements OnInit {
  destinos: any = [];
  destinosCrear: any = [];

  destinosBase: any = {
    fecha_carga: null,
    hora_carga: null,
    usuario: null,
    razon_social: null,
    cuit: null,
    situacion_iva: null,
    direccion_fiscal: null,
    localidad: null,
    departamento: null,
    provincia: null,
    pais: null,
    nro_contrato: null,
    precio: null,
    id_cliente_contab: null,
    cod_cliente: null,
    tipo_formula: 0
  }

  datosExcel: any = [];

  spinner: Boolean = true;
  mostrarCrear: Boolean = false;

  editandoRegistroNro: any = 0;
  ult_cod_destino: any = 0;
  secuenciaEnviar: any = 0;

  logRegistros:any = [];

  displayBasic: Boolean = false;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosDestinos()
  }

  obtenerTodosDestinos() {
    this.spinner = true;
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          this.destinos = []
          res.map( (e:any) => {
            this.destinos.push(e.nombre)
            if(this.ult_cod_destino < parseInt(e.codigo)){
              this.ult_cod_destino = e.codigo
            }
          })
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };

  traerDatosExcel() {
    this.comunicacionService.traerDatosExcelCrear().subscribe(
        (res: any) => {
          this.datosExcel = []
          res.map( (e:any) => {
            e['synagro'] = {}
            this.datosExcel.push(e)
          })

        },
        err => {
            console.log(err);
        }
    );
  };

  compararSynagro(){
    this.destinosCrear = []

    this.datosExcel.map( (e:any) => {
      if(this.destinos.includes(e.destino)){
        e.synagro['destino'] = "ok"
      }
      else {
        e.synagro['destino'] = "No Encontrado"
        if(!this.destinosCrear.includes(e.destino)){
          this.destinosCrear.push({nombre: e.destino, id_tipo_destino:1, id_grupo:0, tipo_merma:1, planilla: 'Granos'})
        }
        this.mostrarCrear = true
      }


      if(this.destinos.includes(e.descarga)){
        e.synagro['descarga'] = "ok"
      }
      else {
        e.synagro['descarga'] = "No Encontrado"
        if(!this.destinosCrear.includes(e.descarga)){
          this.destinosCrear.push({nombre: e.descarga, id_tipo_destino:3, id_grupo:0, tipo_merma:1, planilla: 'Granos'})
        }
        this.mostrarCrear = true
      }


      if(e.ls == 'S'){
        if(this.destinos.includes(e.lotesilo)){
          e.synagro['silo'] = "ok"
        }
        else {
          e.synagro['silo'] = "No Encontrado"
          if(!this.destinosCrear.includes(e.lotesilo)){
            this.destinosCrear.push({nombre: e.lotesilo, id_tipo_destino:2, id_grupo:0, tipo_merma:1, planilla: 'Granos'})
          }
          this.mostrarCrear = true
        }
      } else {
        e.synagro['silo'] = "-"
      }
    })
  }

  ver(){
    console.log(this.destinosCrear)
  }


  crearDestinos(){
    if(confirm('Desea Crear estos destinos?')){
      this.editandoRegistroNro = 0;
      this.enviarCrearDestino();
    }
  }

  enviarCrearDestino(){

    if(this.editandoRegistroNro < this.destinosCrear.length){

      this.comunicacionService.obtenerTodosSecuencia().subscribe(
        (res:any) => {

          let datosAEnviar:any = {...this.destinosBase}

          datosAEnviar['nombre'] = this.destinosCrear[this.editandoRegistroNro].nombre
          datosAEnviar['id_tipo_destino'] = this.destinosCrear[this.editandoRegistroNro].id_tipo_destino
          datosAEnviar['id_grupo'] = this.destinosCrear[this.editandoRegistroNro].id_grupo
          datosAEnviar['tipo_merma'] = this.destinosCrear[this.editandoRegistroNro].tipo_merma
          datosAEnviar['planilla'] = this.destinosCrear[this.editandoRegistroNro].planilla

          datosAEnviar['id'] = parseInt(res[0].secuencia) + 1 + this.editandoRegistroNro
          this.secuenciaEnviar = parseInt(res[0].secuencia) + 1 + this.editandoRegistroNro
          datosAEnviar['codigo'] = parseInt(this.ult_cod_destino) + 1 + this.editandoRegistroNro

          this.editandoRegistroNro++;

          this.crearDestino(datosAEnviar);
        },
        (err:any) => {
          console.log(err);
          this.logRegistros.push({registro: this.destinosCrear[this.editandoRegistroNro].nombre, mensaje:'ERROR! Error conectando a backend SECUENCIA. Ver Consola', ok:false, codigo: null});
        }
      )

    } else{
      this.comunicacionService.editarSecuencia({secuencia: this.secuenciaEnviar}).subscribe(
        (res:any) => {
          setTimeout(() => {
            alert('Terminado');
          }, 50);
        },
        (err:any) => {
          console.log(err);
        }
      )
    }
  }

  crearDestino(e:any){
    this.comunicacionService.crearDestino(e).subscribe(
      (res: any) => {

        this.logRegistros.push({registro: e.nombre, mensaje:'EXITO - Edicion Realizada', ok:true, codigo: e.codigo});

        this.enviarCrearDestino();
      },
      err => {
          console.log(err);
          this.logRegistros.push({registro: e.nombre, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: e.codigo});
      }
    );
  }

}
