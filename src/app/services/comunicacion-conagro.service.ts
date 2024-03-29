import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var vars: any;

@Injectable({
  providedIn: 'root'
})
export class ComunicacionConagroService {

  API_URI = vars.API_URI_CONAGRO;
  PRUEBA = 15;
  PRUEBA_MODAL: any = false;

  constructor(private http: HttpClient, private router : Router) { }
  consultaPermiso(){
    localStorage.getItem('activate') != 'true' ? this.router.navigate(['/error']) : null
  }

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

  //corredores
  obtenerTodosCorredores() {
    return this.http.get(`${this.API_URI}/index.php?tabla=corredores&op=getAll`);
  };
  crearCorredores(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=corredores&op=create`, data);
  };
  modificarCorredores(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=corredores&op=update`, data);
  };

  //corredores descargas
  obtenerTodosCorredoresDescargas() {
    return this.http.get(`${this.API_URI}/index.php?tabla=corredores_descarga&op=getAll`);
  };
  crearCorredoresDescargas(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=corredores_descarga&op=create`, data);
  };
  modificarCorredoresDescargas(data:any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=corredores_descarga&op=update`, data);
  };


  obtenerExcelDescargasCorredores() {
    return this.http.get(`${this.API_URI}/excelDescargas.php`);
  };

  obtenerExcelPrecios() {
    return this.http.get(`${this.API_URI}/excelPrecios.php`);
  };








  no() {
    return this.http.get(`${this.API_URI}/no.php`);
  };

  setValue(ent:any){
    this.PRUEBA_MODAL = ent;
    console.log(this.PRUEBA_MODAL)
  }
  getValue(){
    console.log('a')

    this.PRUEBA_MODAL()
  }
  obtenerServidorExterno(){
    return this.http.get(`https://nortesemillas.000webhostapp.com/api/index.php?tabla=clientes_prueba&op=getAll`);
  }
  modificarServidorExterno(data:any){
    console.log(btoa(JSON.stringify(data)))
    return this.http.get(`https://nortesemillas.000webhostapp.com/api/index.php?tabla=clientes_prueba&op=update&data=${btoa(JSON.stringify(data))}`);
  }
  crearServidorExterno(data:any){
    return this.http.post(`https://nortesemillas.000webhostapp.com/api/index.php?tabla=clientes_prueba&op=create`, data);
  }

}