import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-patentes',
  templateUrl: './patentes.component.html',
  styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

  patentes: any = [];
  patentesCrear: any = [];

  patentesBase: any = {
    actualiza_saldo: null,
    alicuota: null,
    aplica_tercerizacion: null,
    arranque: null,
    categoria_iibb: null,
    categoria_iva: null,
    cliente_tipo_co_id: null,
    cod_cuenta: "5410300",
    cod_externo: null,
    cod_formula_iibb: null,
    cod_localidad: null,
    cod_proveedor: "0",
    cod_provincia: null,
    codigo_cliente: null,
    codigo_postal: null,
    coeficiente_iibb_cm: "1.0000",
    contacto: null,
    contratista_campo: null,
    contratista_construccion: null,
    cuenta_de_gasto: null,
    cuit: null,
    desde_iibb: null,
    dgr_contribuyente_tipo_id: "1",
    domicilio: null,
    email: null,
    fax: null,
    fletero_campo: "1",
    formula: null,
    gln: null,
    grupo: null,
    hasta_iibb: null,
    id: '',
    id_contribuyente_tipo: null,
    moneda: null,
    movimiento_origen_id: "1",
    nombre: "",
    numero_cai: null,
    numero_retencion_ib: null,
    observaciones: null,
    origen: "1",
    proveedor_campo: null,
    proveedor_construccion: null,
    responsable_pago: null,
    saldo_inicial: null,
    saldo_inicial_tag_2: null,
    sujeto_retencion: null,
    telefono: null,
    tipo_corredor: null,
    tipo_retencion: null,
    vencimiento_cai: null
  }

  datosExcel: any = [];

  spinner: Boolean = true;
  mostrarCrear: Boolean = false;

  editandoRegistroNro: any = 0;
  ult_cod_proveedor: any = 0;
  secuenciaEnviar: any = 0;

  logRegistros:any = [];

  displayBasic: Boolean = false;

  constructor(
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosProveedores()
  }

  obtenerTodosProveedores() {
    this.spinner = true;
    this.comunicacionService.obtenerTodosProveedores().subscribe(
        (res: any) => {
          this.patentes = ['', null]
          res.map( (e:any) => {
            this.patentes.push(e.nombre)
            if(this.ult_cod_proveedor < parseInt(e.cod_proveedor)){
              this.ult_cod_proveedor = e.cod_proveedor
            }
          })
          this.spinner = false;
        },
        err => {
            console.log(err);
        }
    );
  };

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

  compararSynagro(){
    this.patentesCrear = []

    this.datosExcel.map( (e:any) => {
      if(this.patentes.includes(e.transporte)){
        e.synagro = "ok"
      } else {
        e.synagro = "No encontrado"
        if(!this.patentesCrear.includes(e.transporte)){
          this.patentesCrear.push(e.transporte)
        }
        this.mostrarCrear = true
      }
    })
  }

  crearPatentes(){
    if(confirm('Desea Crear estas patentes?')){
      this.editandoRegistroNro = 0;
      this.enviarCrearPatente();
    }
  }

  enviarCrearPatente(){

    if(this.editandoRegistroNro < this.patentesCrear.length){

      this.comunicacionService.obtenerTodosSecuencia().subscribe(
        (res:any) => {

          let datosAEnviar:any = {...this.patentesBase}

          datosAEnviar['nombre'] = this.patentesCrear[this.editandoRegistroNro]
          datosAEnviar['id'] = parseInt(res[0].secuencia) + 1 + this.editandoRegistroNro
          this.secuenciaEnviar = parseInt(res[0].secuencia) + 1 + this.editandoRegistroNro
          datosAEnviar['cod_proveedor'] = parseInt(this.ult_cod_proveedor) + 1 + this.editandoRegistroNro

          this.editandoRegistroNro++;

          this.crearPatente(datosAEnviar);
        },
        (err:any) => {
          console.log(err);
          this.logRegistros.push({registro: this.patentesCrear[this.editandoRegistroNro], mensaje:'ERROR! Error conectando a backend SECUENCIA. Ver Consola', ok:false, codigo: null});
        }
      )

    } else{
      this.comunicacionService.editarSecuencia({secuencia: this.secuenciaEnviar}).subscribe(
        (res:any) => {
          setTimeout(() => {
            alert('Terminado');
          }, 50);
        },
        (err:any) => {
          console.log(err);
        }
      )
    }
  }

  crearPatente(e:any){
    this.comunicacionService.crearProveedor(e).subscribe(
      (res: any) => {

        this.logRegistros.push({registro: e.nombre, mensaje:'EXITO - Creado correctamente', ok:true, codigo: e.cod_proveedor});

        this.enviarCrearPatente();
      },
      err => {
          console.log(err);
          this.logRegistros.push({registro: e.nombre, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: e.cod_proveedor});
      }
    );
  }

}
