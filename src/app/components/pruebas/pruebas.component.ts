import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {


  produccion: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosProduccion()
  }

  obtenerTodosProduccion() {
    this.comunicacionService.obtenerTodosProduccion().subscribe(
        (res: any) => {
          //res.map( (e:any) => { if(e.origen) this.produccion.push(e) } )
          this.produccion = [...res];
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };

  funcc(){
    this.produccion[4].cod_chofer == "" ? this.produccion[4].cod_chofer = null : null
    console.log(
      this.produccion[4].cod_chofer
    )
  }

}
