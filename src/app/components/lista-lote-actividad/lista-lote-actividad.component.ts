import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-lote-actividad',
  templateUrl: './lista-lote-actividad.component.html',
  styleUrls: ['./lista-lote-actividad.component.css']
})
export class ListaLoteActividadComponent implements OnInit {

  lotes: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosLoteActividad()
  }

  obtenerTodosLoteActividad() {
    this.comunicacionService.obtenerTodosLoteActividad().subscribe(
        (res: any) => {
          this.lotes = [...res];
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };

}
