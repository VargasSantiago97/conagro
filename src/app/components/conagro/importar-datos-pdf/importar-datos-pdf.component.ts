import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-importar-datos-pdf',
  templateUrl: './importar-datos-pdf.component.html',
  styleUrls: ['./importar-datos-pdf.component.css']
})
export class ImportarDatosPDFComponent implements OnInit {

  constructor(private comunicacionConagroService : ComunicacionConagroService) { }

  socios: any = [];
  cpeRegistro: any = {};
  registrosCpePDF : any = [];

  socioSeleccionado: any = 'NORTE';
  tipoCpe: any = 74;

  logRegistros: any = [];
  spinner: Boolean = false;

  creandoRegistro: any = 0;

  ngOnInit(): void {
    this.obtenerTodosSocios()
    this.obtenerTodosCpeDescarga()
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

  obtenerTodosCpeDescarga(){
    this.comunicacionConagroService.obtenerTodosCpeDescarga().subscribe(
      (res:any) => {
        res.map( (cpe:any) => {
          this.cpeRegistro[cpe.nro_ctg] = cpe.id
        })
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  traerDatosCpePDF(){
    this.spinner = true;
    this.comunicacionConagroService.obtenerDatosPDF(this.socioSeleccionado).subscribe(
      (res:any) => {
        this.registrosCpePDF = [ ...res ] 
        this.spinner = false;
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
    if(this.creandoRegistro < this.registrosCpePDF.length){

      let datoAEnviar:any = {
        nro_cp: this.registrosCpePDF[this.creandoRegistro].cp,
        nro_ctg: this.registrosCpePDF[this.creandoRegistro].ctg,
        kg_destino: this.registrosCpePDF[this.creandoRegistro].bruto,
        kg_tara: this.registrosCpePDF[this.creandoRegistro].tara,
        kg_neto_dest: this.registrosCpePDF[this.creandoRegistro].neto
      }

      this.creandoRegistro++;

      if(this.cpeRegistro[datoAEnviar['nro_ctg']]){
        datoAEnviar['id'] = this.cpeRegistro[datoAEnviar['nro_ctg']]
        this.modificarRegistro(datoAEnviar);
        //this.crearRegistros() //PARA CARGA INICIAL COMENTAR EL DE ARRIBA Y DESCOMENTAR ESTE
      }else{
        this.crearRegistro(datoAEnviar);
      }
    } else {
    alert('Terminado');
    }
  }

  crearRegistro(data : any){
    this.comunicacionConagroService.crearCpeDescarga(data).subscribe(
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
    this.comunicacionConagroService.modificarCpeDescarga(data).subscribe(
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
