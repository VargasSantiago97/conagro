import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] = [];
  title = 'conagro';


  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            routerLink: 'inicio'
        },
        {
            label: 'Datos SYNAGRO',
            items: [
              {label: 'Listar Produccion', routerLink: 'listProduccion'},
              {label: 'Listar Proveedores', routerLink: 'listProveedores'},
              {label: 'Listar Proveedores. Solo Fleteros', routerLink: 'listFleteros'},
              {label: 'Listar Destinos', routerLink: 'listDestinos'},
              {label: 'Listar Lotes', routerLink: 'listLotes'},
            ]
        },
        {
            label: 'Importar XLSX',
            items: [
              {
                label: 'Modificar',
                items: [
                  {label: 'Cargar XLSX', routerLink: 'cargar'},
                  {label: 'Ver ultimo XLSX', routerLink: 'verxlsx'},
                ]
              },
              //{separator:true},
              {
                label: 'Crear',
                items: [
                  {label: 'Cargar XLSX', routerLink: 'cargarCrear'},
                  {label: 'Ver ultimo XLSX', routerLink: 'verXlsxCrear'},
                ]
              },
            ]
        },
        {
            label: 'Modificar',
            items: [
              {label: 'Cambios a realizar', routerLink: 'verCambios'}
            ]
        },
        {
            label: 'Crear Registros',
            items: [
              {label: 'Creacion por importacion', routerLink: 'crearRegistros'}
            ]
        }
    ];
  }
}
