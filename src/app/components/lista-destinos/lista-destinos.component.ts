import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosDestinos()
  }

  obtenerTodosDestinos() {
    this.comunicacionService.obtenerTodosDestinos().subscribe(
        (res: any) => {
          this.destinos = [...res];
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };
}
