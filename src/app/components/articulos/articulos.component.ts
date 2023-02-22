import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
declare var vars: any;

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  API_URI = vars.API_URI_CONAGRO;

  articulos: any = [];
  DIC_articulos: any = {};

  stockCampo: any = [];
  DIC_stockCampo: any = {};

  stockItem: any = [];
  DIC_stockItem: any = {};
  
  spinnerArticulos: Boolean = true;
  spinnerStockCampo: Boolean = true;
  spinnerStockItem: Boolean = true;


  registrosExcel: any = [];
  logRegistros: any = [];

  dateRange: any = [];

  remitosFiltrados:any = [];
  idRemitosModificar: any = [];

  itemsAEditar: any = [];
  creandoRegistro: any = 0;

  constructor(
    private comunicacionService: ComunicacionService,
    private comunicacionConagroService: ComunicacionConagroService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosArticulos();
    this.obtenerTodosStockCampo();
    this.obtenerTodosStockItem();
  }

  obtenerTodosArticulos() {
    this.comunicacionService.obtenerTodosArticulos().subscribe(
        (res: any) => {
          this.articulos = [...res];

          res.map((e:any) => {
            this.DIC_articulos[e.id] = e
          })
          this.spinnerArticulos = false;
        },
        err => {
          console.log(err);
        }
    );
  };
  obtenerTodosStockCampo() {
    this.comunicacionService.obtenerTodosStockCampo().subscribe(
        (res: any) => {
          this.stockCampo = [...res];

          res.map((e:any) => {
            this.DIC_stockCampo[e.id] = e
          })
          this.spinnerStockCampo = false;
        },
        err => {
          console.log(err);
        }
    );
  };
  obtenerTodosStockItem() {
    this.comunicacionService.obtenerTodosStockItem().subscribe(
        (res: any) => {
          this.stockItem = [...res];

          res.map((e:any) => {
            this.DIC_stockItem[e.id] = e
          })
          this.spinnerStockItem = false;

          console.log(res)
        },
        err => {
          console.log(err);
        }
    );
  };

  onUpload(event:any) {
    alert('Cargado 🤩😁👉👌')
    this.obtenerExcelPrecios()
  }

  obtenerExcelPrecios(){
    this.comunicacionConagroService.obtenerExcelPrecios().subscribe(
      (res:any) => {
          this.registrosExcel = [ ...res ];
          console.log(res)
          },
        (err:any) => {
          console.log(err)
        }
      )
  }

  buscarRemitos(){

    this.remitosFiltrados = []
    this.idRemitosModificar = []

    this.stockCampo.map((registro:any) => {
      var coincide_fechaEmision = false;

      if(this.dateRange){
        if(this.dateRange[0] && this.dateRange[1]){
          let dateRegistro = new Date(registro.fecha_ingreso)
          dateRegistro.setHours(dateRegistro.getHours()+3);
          coincide_fechaEmision = (this.dateRange[0] <=  dateRegistro) && (dateRegistro <= this.dateRange[1])
        }else{
          coincide_fechaEmision = true
        }
      }else{
        coincide_fechaEmision = true
      }

      if(coincide_fechaEmision){
        this.remitosFiltrados.push(registro)
        this.idRemitosModificar.push(registro.id)
      }
    })

    this.controlarItems()
  }

  controlarItems(){
    this.itemsAEditar = []
    this.stockItem.map((registro:any) => {
      var coincide_remito = this.idRemitosModificar.includes(registro.id_stock)
      var coincide_listado = this.registrosExcel.some((e:any) => { return e.id == registro.id_producto })

      if(coincide_remito && coincide_listado){
        var registroExcel = this.registrosExcel.find((e:any) => { return e.id == registro.id_producto })
        registro.precio_dolar = registroExcel.precio
        registro.remito = this.stockCampo.find((e:any) => { return e.id == registro.id_stock }).remito_nro

        this.itemsAEditar.push(registro)
      }
    })
  }

  actualizarPrecios(){
    if(confirm('Desea Editar estos Precios?')){
      this.creandoRegistro = 0;
      this.enviarDato()
    }
  }

  enviarDato(){
    if(this.creandoRegistro < this.itemsAEditar.length){

      let datoAEnviar:any = {...this.itemsAEditar[this.creandoRegistro]}

      this.creandoRegistro++;

      this.modificarRegistro(datoAEnviar);
      
    } else {
      alert('Terminado');
    }
  }

  modificarRegistro(data : any){
    this.comunicacionService.editarStockItem(data).subscribe(
      (res: any) => {
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje: `EXITO - MODIFICADO correctamente. Remito N° ${data.remito}`, ok:res.mensaje, codigo: data.id});
        setTimeout(() => {
          this.enviarDato();
        }, 50);
      },
      err => {
        console.log(err);
        this.logRegistros.unshift({registro: this.creandoRegistro, mensaje:'ERROR! Error conectando a backend. Ver Consola', ok:false, codigo: data.id});

        setTimeout(() => {
          this.creandoRegistro--;
          this.enviarDato();
        }, 5000);
      }
    );
  }

}
