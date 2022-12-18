import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-crear-registros',
  templateUrl: './crear-registros.component.html',
  styleUrls: ['./crear-registros.component.css']
})
export class CrearRegistrosComponent implements OnInit {

  datosExcel: any = [];

  displayBasic: Boolean = false;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
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

  showBasicDialog(){
    this.displayBasic = true;
  }

}


/* 
"fecha": "2002-07-30",
"lote": 229,
"transporte": 47,
"distancia": null,
"pcio_flete": null,
"remito": 688,
"kg_origen": 29820.0000,
"humedad1": 0.0,
"kg_neto_orig": 29820.0000,
"cod_dest": 133,
"destino": null,
"kg_destino": 0.000,
"humedad2": 0.0,
"kg_neto_dest": 0.0000,
"diferencia": 29820.0000,
"romaneo": null,
"zaranda": 0.00,
"volatil": 0.00,
"cuerp_ext": 0.00,
"tierra": 0.00,
"quebrados": 0.00,
"daniados": 0.00,
"chamico": 0.00,
"otros": 0.00,
"factor": 0.00,
"kg_neto_co": null,
"observar": "Ale: 30300kg Descargó 550= 29750kg",
"AREA": 2,
"id": 5965713,
"finca": null,
"tipo_origen": "L",
"origen": null,
"usuario": "SEBADAV",
"fecha_carga": "2022-10-06",
"hora_carga": "16:31:35",
"precio": null,
"gasto_flete": null,
"gasto_comercializacion": null,
"gasto_acondicionamiento": null,
"tipo": null,
"id_pc": null,
"numero": 3022,
"kg_bruto_origen": 45120.0000,
"kg_tara_origen": 15300,
"patente_camion": null,
"patente_acoplado": null,
"nombre_chofer": null,
"cuit_chofer": null,
"tipo_grano": null,
"cod_cuentayorden1": null,
"cod_cuentayorden2": null,
"cod_corredor": null,
"cod_representante": null,
"cod_asignador_cupo": null,
"proc_calle": null,
"proc_nro": null,
"proc_codpostal": null,
"proc_localidad": null,
"proc_depto": null,
"proc_provincia": null,
"fecha_cupo": null,
"variedad": null,
"cod_lote_actividad": 554,
"cod_periodo": 4,
"id_contrato": null,
"id_contratista": null,
"cod_dest_descarga": 181,
"marca_importacion": null,
"origen_importacion": null,
"nro_ctg": "10105849361",
"nro_cp": "00000555",
"neto_afip": null,
"cod_chofer": null,
"tipo_transporte": "S",
"id_stock_campo": null
*/