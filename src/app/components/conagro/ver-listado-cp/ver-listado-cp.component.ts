import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-ver-listado-cp',
  templateUrl: './ver-listado-cp.component.html',
  styleUrls: ['./ver-listado-cp.component.css']
})
export class VerListadoCPComponent implements OnInit {

  constructor(private comunicacionConagroService : ComunicacionConagroService) { }

  cpe: any = [];

  ngOnInit(): void {
    this.obtenerTodosCpe()
  }

  obtenerTodosCpe(){
    this.comunicacionConagroService.obtenerTodosCpe().subscribe(
      (res:any) => {
        this.cpe = [ ...res ]
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

}
