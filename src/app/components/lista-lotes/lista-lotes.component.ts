import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-lotes',
  templateUrl: './lista-lotes.component.html',
  styleUrls: ['./lista-lotes.component.css']
})
export class ListaLotesComponent implements OnInit {

  lotes: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosLotes()
  }

  obtenerTodosLotes() {
    this.comunicacionService.obtenerTodosLotes().subscribe(
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
