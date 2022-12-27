import { Component, OnInit } from '@angular/core';
import * as vars from 'globals';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-actualizar-listado-cp',
  templateUrl: './actualizar-listado-cp.component.html',
  styleUrls: ['./actualizar-listado-cp.component.css']
})
export class ActualizarListadoCPComponent implements OnInit {

  API_URI = vars.API_URI_CONAGRO;

  constructor(private comunicacionConagroService : ComunicacionConagroService) { }

  socios: any = [];
  registrosExcel: any = [];
  cpe: any = [];
  cpeRegistro: any = {};

  logRegistros: any = [];

  socioSeleccionado: any = 1;
  tipoCpe: any = 74;

  creandoRegistro: any = 0;


  ngOnInit(): void {
    this.obtenerTodosSocios()
    this.obtenerTodosCpe()
  }

  onUpload(event:any) {
    alert('Cargado 👍')
    this.obtenerExcelCP()
  }

  obtenerExcelCP(){
    this.comunicacionConagroService.obtenerExcelCP().subscribe(
      (res:any) => {
        this.registrosExcel = [ ...res ]
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosCpe(){
    this.comunicacionConagroService.obtenerTodosCpe().subscribe(
      (res:any) => {
        this.cpe = [ ...res ]
        res.map( (cpe:any) => {
          this.cpeRegistro[cpe.cpe] = cpe.id
        })
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  obtenerTodosSocios(){
    this.comunicacionConagroService.obtenerTodosSocios().subscribe(
      (res:any) => {
        this.socios = [ ...res ]
      },
      (err:any) => {
        console.log(err)
      }
    )
  }



  cargarDatos(){
    if(confirm('Desea Cargar estos datos?')){
      this.creandoRegistro = 0;
      this.crearRegistros()
    }
  }

  crearRegistros(){
    if(this.creandoRegistro < this.registrosExcel.length){

      let datoAEnviar:any = {...this.registrosExcel[this.creandoRegistro]}

      datoAEnviar['socio'] = this.socioSeleccionado
      datoAEnviar['tipo_cpe'] = this.tipoCpe

      this.creandoRegistro++;

      if(this.cpeRegistro[datoAEnviar['cpe']]){
        datoAEnviar['id'] = this.cpeRegistro[datoAEnviar['cpe']]
        this.modificarRegistro(datoAEnviar);
      }else{
        this.crearRegistro(datoAEnviar);
      }
    } else {
    alert('Terminado');
    }
  }

  crearRegistro(data : any){
    this.comunicacionConagroService.crearCpe(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - Creado correctamente', ok:res.mensaje, codigo: data.cpe});
        setTimeout(() => {
          this.crearRegistros();
        }, 100);
      },
      err => {
          console.log(err);
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.cpe});
      }
    );
  }

  modificarRegistro(data : any){
    this.comunicacionConagroService.modificarCpe(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - MODIFICADO correctamente', ok:res.mensaje, codigo: data.cpe});
        setTimeout(() => {
          this.crearRegistros();
        }, 100);
      },
      err => {
          console.log(err);
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.cpe});
      }
    );
  }

}
