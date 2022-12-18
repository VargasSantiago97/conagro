import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-verxlsx',
  templateUrl: './verxlsx.component.html',
  styleUrls: ['./verxlsx.component.css']
})
export class VerxlsxComponent implements OnInit {

  datosExcel: any = [];

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.traerDatosExcel()
  }

  traerDatosExcel() {
    this.comunicacionService.traerDatosExcel().subscribe(
        (res: any) => {
          this.datosExcel = [...res];
        },
        err => {
            console.log(err);
        }
    );
  };

}
