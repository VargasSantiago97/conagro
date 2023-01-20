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
          this.cpeRegistro[cpe.nro_ctg] = cpe
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
        datoAEnviar['id'] = this.cpeRegistro[datoAEnviar['nro_ctg']].id

        if( datoAEnviar['nro_cp'] == this.cpeRegistro[datoAEnviar['nro_ctg']].nro_cp &&
            datoAEnviar['nro_ctg'] == this.cpeRegistro[datoAEnviar['nro_ctg']].nro_ctg &&
            datoAEnviar['kg_destino'] == this.cpeRegistro[datoAEnviar['nro_ctg']].kg_destino &&
            datoAEnviar['kg_tara'] == this.cpeRegistro[datoAEnviar['nro_ctg']].kg_tara &&
            datoAEnviar['kg_neto_dest'] == this.cpeRegistro[datoAEnviar['nro_ctg']].kg_neto_dest
        ){
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'NO MODIFICADO - No hubo cambios', ok:'ok', codigo: datoAEnviar['nro_ctg']});
          this.crearRegistros()
        }else{
          this.modificarRegistro(datoAEnviar);
        }

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
        }, 200);
      },
      err => {
          console.log(err);
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.cpe});
          console.log('\nIntentando nuevamente...')
          this.crearRegistros();
      }
    );
  }

  modificarRegistro(data : any){
    this.comunicacionConagroService.modificarCpeDescarga(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'EXITO - MODIFICADO correctamente', ok:res.mensaje, codigo: data.cpe});
        setTimeout(() => {
          this.crearRegistros();
        }, 200);
      },
      err => {
          console.log(err);
          this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.cpe});
          this.creandoRegistro--;
          console.log('\nIntentando nuevamente...')
          setTimeout(() => {
            this.crearRegistros();
          }, 1000);
      }
    );
  }

}
