import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {


  value1:any = 0;

  produccion: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionConagroService
  ) { }

  ngOnInit(): void {
    this.obtenerNumero()
  }

  obtenerNumero() {
  };

  funcc(){
    setInterval( () => {
      this.value1 = this.comunicacionService.getValue();
    }, 20)
  }
  
  funccc(){
    this.comunicacionService.setValue(10);
  }



}
