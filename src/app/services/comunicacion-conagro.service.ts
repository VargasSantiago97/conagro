import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as vars from 'globals';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionConagroService {

  API_URI = vars.API_URI_CONAGRO;

  constructor(private http: HttpClient) { }

  obtenerTodosSocios() {
    return this.http.get(`${this.API_URI}/index.php?tabla=socios&op=getAll`);
  };
  
  obtenerTodosCuits() {
    return this.http.get(`${this.API_URI}/index.php?tabla=cuits&op=getAll`);
  };

  obtenerExcelCP() {
    return this.http.get(`${this.API_URI}/excel.php`);
  };

  obtenerTodosCpe() {
    return this.http.get(`${this.API_URI}/index.php?tabla=cpe&op=getAll`);
  };

  crearCpe(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=cpe&op=create`, data);
  };

  modificarCpe(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=cpe&op=update`, data);
  };


  //PDF CPE
  obtenerDatosPDF(socio:any) {
    return this.http.get(`${this.API_URI}/cpe.php?socio=`+socio);
  };

  obtenerTodosCpeDescarga() {
    return this.http.get(`${this.API_URI}/index.php?tabla=cpe_descarga&op=getAll`);
  };

  crearCpeDescarga(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=cpe_descarga&op=create`, data);
  };

  modificarCpeDescarga(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=cpe_descarga&op=update`, data);
  };

}