import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';
declare var vars: any;

@Component({
  selector: 'app-cargar-descargas',
  templateUrl: './cargar-descargas.component.html',
  styleUrls: ['./cargar-descargas.component.css']
})
export class CargarDescargasComponent implements OnInit {

  API_URI = vars.API_URI_CONAGRO;

  spinnerCorredores: Boolean = true;
  spinnerSocios: Boolean = true;
  spinnerDatos:Boolean = true;

  corredores:any = [];
  socios:any = [];
  corredoresDescarga:any = [];

  socioSeleccionado: any = 1;
  corredorSeleccionado: any = 1;

  permitirCargar: Boolean = true;
  permitirVerTabla: Boolean = false;
  registrosExcel: any = [];

  logRegistros:any = [];

  creandoRegistro:any = 0;

  constructor(private comunicacionConagroService: ComunicacionConagroService) { }

  ngOnInit(): void {
    this.obtenerTodosCorredores();
    this.obtenerTodosSocios();
    this.obtenerTodosCorredoresDescargas();
  }

  
  obtenerTodosCorredores(){
    this.comunicacionConagroService.obtenerTodosCorredores().subscribe(
      (res:any) => {
        this.corredores = res;

        this.spinnerCorredores = false;
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

        this.spinnerSocios = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }

  obtenerTodosCorredoresDescargas(){
    this.comunicacionConagroService.obtenerTodosCorredoresDescargas().subscribe(
      (res:any) => {
        this.corredoresDescarga = res;
        this.spinnerDatos = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }



  onUpload(event:any) {
    this.permitirCargar = false;
    this.permitirVerTabla = true;
    alert('Cargado 👍')
    this.obtenerExcelCP()
  }
  
  obtenerExcelCP(){
  this.comunicacionConagroService.obtenerExcelDescargasCorredores().subscribe(
    (res:any) => {
        this.registrosExcel = [ ...res ];

        console.log(this.registrosExcel);
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  importacionDatos(){
    if(confirm('Desea Importar estos datos?')){
      this.creandoRegistro = 0;
      this.crearRegistros()
    }
  }


  crearRegistros(){
    if(this.creandoRegistro < this.registrosExcel.length){

      let datoAEnviar:any = {...this.registrosExcel[this.creandoRegistro]}

      datoAEnviar['socio'] = this.socioSeleccionado
      datoAEnviar['corredor'] = this.corredorSeleccionado

      this.creandoRegistro++;

      if(this.corredoresDescarga.some( (e:any) => { return e.nro_ctg == datoAEnviar['nro_ctg']})){
        var registroComparar = this.corredoresDescarga.find( (e:any) => { return e.nro_ctg ==  datoAEnviar['nro_ctg']})
        if(
          registroComparar.socio == datoAEnviar.socio &&
          registroComparar.kg_bruto == datoAEnviar.kg_bruto &&
          registroComparar.kg_tara == datoAEnviar.kg_tara &&
          registroComparar.kg_descarga == datoAEnviar.kg_descarga &&
          registroComparar.kg_mermas == datoAEnviar.kg_mermas &&
          registroComparar.humedad == datoAEnviar.humedad &&
          registroComparar.kg_neto == datoAEnviar.kg_neto &&
          registroComparar.observaciones == datoAEnviar.observaciones
        ){
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'NO MODIF. - No se detectaron cambios', ok:true, codigo: datoAEnviar['nro_ctg']});
          this.crearRegistros();
        }else{
          datoAEnviar['id'] = registroComparar.id
          this.modificarRegistro(datoAEnviar);
        }

      }else{
        this.crearRegistro(datoAEnviar);
      }
    } else {
      alert('Terminado');
    }
  }

  crearRegistro(data : any){
    this.comunicacionConagroService.crearCorredoresDescargas(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - Creado correctamente', ok:res.mensaje, codigo: data.nro_ctg});
        setTimeout(() => {
          this.crearRegistros();
        }, 50);
      },
      err => {
        console.log(err);
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.nro_ctg});

        setTimeout(() => {
          this.creandoRegistro--;
          this.crearRegistros();
        }, 5000);
      }
    );
  }

  modificarRegistro(data : any){
    this.comunicacionConagroService.modificarCorredoresDescargas(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - MODIFICADO correctamente', ok:res.mensaje, codigo: data.nro_ctg});
        setTimeout(() => {
          this.crearRegistros();
        }, 50);
      },
      err => {
        console.log(err);
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.nro_ctg});

        setTimeout(() => {
          this.creandoRegistro--;
          this.crearRegistros();
        }, 5000);
      }
    );
  }

/* 
fecha
nro_ctg
descarga
kg_bruto
kg_tara
kg_descarga
kg_mermas
humedad
kg_neto
observaciones
*/
}
