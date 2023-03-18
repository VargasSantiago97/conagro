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

  dataCruda: any;
  permiteModificar: any = false;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
  }

  transformarDatos(){
    this.datosAModificar = JSON.parse(this.dataCruda)

    this.permiteModificar = true

    this.datosAModificar.forEach((e:any) => {
      if(!(e.numero && e.kg_neto_dest && e.kg_neto_orig && e.observar && e.diferencia)){
        console.log('error en: ')
        console.log(e)
        this.permiteModificar = false
      }
    });

    this.permiteModificar ? alert('ok') : alert('Error')
  }

  enviarRegistro(){
    //this.editarRegistro("a")
    //console.log(this.datosAModificar)

    //this.editandoRegistroNro

    let cantidadTotal = this.datosAModificar.length

    if(this.editandoRegistroNro < cantidadTotal){
      if(this.datosAModificar[this.editandoRegistroNro].numero && this.datosAModificar[this.editandoRegistroNro].kg_neto_dest && this.datosAModificar[this.editandoRegistroNro].kg_neto_orig && this.datosAModificar[this.editandoRegistroNro].observar && this.datosAModificar[this.editandoRegistroNro].diferencia){
        this.editarRegistro(this.datosAModificar[this.editandoRegistroNro])
      }else{
        console.log('error parametros')
      }
    } else {
      alert('Fin.')
    }
  }



  editarRegistro(registro:any) {
    this.comunicacionService.editarProduccionKilos(registro).subscribe(
        (res: any) => {
          this.logRegistros.unshift({registro: registro.numero, mensaje:'EXITO - Edicion Realizada', ok:true});
          this.editandoRegistroNro++;
          setTimeout(() => {
            this.enviarRegistro();
          }, 50);
        },
        err => {
            console.log(err);
            this.logRegistros.unshift({registro: registro.numero, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false});
            setTimeout(() => {
              this.enviarRegistro();
            }, 500);
        }
    );
  };
}