import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-lista-fleteros',
  templateUrl: './lista-fleteros.component.html',
  styleUrls: ['./lista-fleteros.component.css']
})
export class ListaFleterosComponent implements OnInit {

  proveedores: any = [];
  spinner: Boolean = true;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosProveedores()
  }

  obtenerTodosProveedores() {
    console.log("e");
    this.comunicacionService.obtenerTodosProveedores().subscribe(
        (res: any) => {
          
          this.proveedores = res.filter( (e:any) => e.fletero_campo == 1);
          this.spinner  = false;

        },
        err => {
            console.log(err);
        }
    );
  };

}
