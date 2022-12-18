import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-produccion',
  templateUrl: './lista-produccion.component.html',
  styleUrls: ['./lista-produccion.component.css']
})
export class ListaProduccionComponent implements OnInit {

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
          this.produccion = [...res];
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };
}
