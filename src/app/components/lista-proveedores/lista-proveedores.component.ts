import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  proveedores: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosProveedores()
  }

  obtenerTodosProveedores() {
    this.comunicacionService.obtenerTodosProveedores().subscribe(
        (res: any) => {
          this.proveedores = [...res];
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };

}
