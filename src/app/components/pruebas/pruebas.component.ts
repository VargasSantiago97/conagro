import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {


  value1:any = 0;

  produccion: any = [];
  spinner: Boolean = true;

  dockItems: any = [];

  idModificar:any = ''
  nombreModificar:any = ''
  dataCliente: any;

  constructor(
    private comunicacionService: ComunicacionConagroService
  ) { }

  ngOnInit(): void {
    this.dockItems = [
      {
          label: 'Finder',
          icon: "https://cdn-icons-png.flaticon.com/512/263/263100.png"
      },
      {
          label: 'App Store',
          icon: "https://primefaces.org/cdn/primeng/images/dock/appstore.svg"
      },
      {
          label: 'Photos',
          icon: "https://primefaces.org/cdn/primeng/images/dock/photos.svg"
      },
      {
          label: 'Trash',
          icon: "https://primefaces.org/cdn/primeng/images/dock/trash.png"
      },
      {
          label: 'App Store',
          icon: "https://primefaces.org/cdn/primeng/images/dock/appstore.svg"
      },
      {
          label: 'Photos',
          icon: "https://primefaces.org/cdn/primeng/images/dock/photos.svg"
      },
      {
          label: 'Trash',
          icon: "https://primefaces.org/cdn/primeng/images/dock/trash.png"
      },
      {
          label: 'App Store',
          icon: "https://primefaces.org/cdn/primeng/images/dock/appstore.svg"
      },
      {
          label: 'Photos',
          icon: "https://primefaces.org/cdn/primeng/images/dock/photos.svg"
      },
      {
          label: 'Trash',
          icon: "https://primefaces.org/cdn/primeng/images/dock/trash.png"
      },
      {
          label: 'App Store',
          icon: "https://primefaces.org/cdn/primeng/images/dock/appstore.svg"
      }
    ];

    this.obtenerNumero()
  }

  obtenerNumero() {
  };

  funcc(){
    setInterval( () => {
      this.value1 = this.comunicacionService.getValue();
    }, 20)
  }
  
  funccc(){
    this.comunicacionService.getValue();
  }
  



  obtenerServidorExterno(){
    this.comunicacionService.obtenerServidorExterno().subscribe(
      (res:any) => {
        console.log(res)
        var modificacion = new Date(res[0].modificacion)
        console.log(modificacion)
        this.dataCliente = res[0]
        this.nombreModificar = this.dataCliente.nombre
      },
      (err:any) => {
        console.log(err)
      }
    );
  }
  modificarServidorExterno(){
    this.dataCliente.nombre = this.nombreModificar
    console.log(JSON.stringify(this.dataCliente))
    this.comunicacionService.modificarServidorExterno(this.dataCliente).subscribe(
      (res:any) => {
        console.log(res)
      },
      (err:any) => {
        console.log(err)
      }
    );
  }
  crearServidorExterno(){
    this.comunicacionService.crearServidorExterno({}).subscribe(
      (res:any) => {
        console.log(res)
      },
      (err:any) => {
        console.log(err)
      }
    );
  }



}
