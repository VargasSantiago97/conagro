import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-ver-xlsx-crear',
  templateUrl: './ver-xlsx-crear.component.html',
  styleUrls: ['./ver-xlsx-crear.component.css']
})
export class VerXlsxCrearComponent implements OnInit {

  datosExcel: any = [];

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.traerDatosExcel()
  }

  traerDatosExcel() {
    this.comunicacionService.traerDatosExcelCrear().subscribe(
        (res: any) => {
          this.datosExcel = [...res];
        },
        err => {
            console.log(err);
        }
    );
  };

}
