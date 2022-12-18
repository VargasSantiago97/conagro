import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as vars from 'globals';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  API_URI = vars.API_URI;

  constructor(private http: HttpClient) { }

  obtenerTodosProduccion() {
    return this.http.get(`${this.API_URI}/index.php?tabla=produccion&op=getAll`);
  };

  editarProduccion(data : any){
    return this.http.post(`${this.API_URI}/index.php?tabla=produccion&op=update`, data);
  }

  obtenerTodosProveedores() {
    return this.http.get(`${this.API_URI}/index.php?tabla=proveedores&op=getAll`);
  };

  obtenerTodosDestinos() {
    return this.http.get(`${this.API_URI}/index.php?tabla=destinos&op=getAll`);
  };

  obtenerTodosLotes() {
    return this.http.get(`${this.API_URI}/index.php?tabla=lotes&op=getAll`);
  };

  traerDatosExcel() {
    return this.http.get(`${this.API_URI}/excel.php`);
  };

  traerDatosExcelCrear() {
    return this.http.get(`${this.API_URI}/excelCrear.php`);
  };
}
