import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var vars: any;

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  API_URI = vars.API_URI;

  constructor(private http: HttpClient) { }

  obtenerTodosProduccion() {
    return this.http.get(`${this.API_URI}/index.php?tabla=produccion&op=getAll`);
  };

  obtenerTodosProduccionOrigen() {
    return this.http.get(`${this.API_URI}/index.php?tabla=produccion_origen&op=getAll`);
  };

  obtenerTodosEstablecimiento() {
    return this.http.get(`${this.API_URI}/index.php?tabla=establecimiento&op=getAll`);
  };

  editarProduccion(data : any){
    return this.http.post(`${this.API_URI}/index.php?tabla=produccion&op=update`, data);
  }

  editarProduccionKilos(data : any){
    return this.http.post(`${this.API_URI}/index.php?tabla=produccion_kilos&op=update`, data);
  }
  
  crearProduccion(data : any){
    return this.http.post(`${this.API_URI}/index.php?tabla=produccion&op=create`, data);
  }

  obtenerTodosProveedores() {
    return this.http.get(`${this.API_URI}/index.php?tabla=proveedores&op=getAll`);
  };

  crearProveedor(data : any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=proveedores&op=create`, data);
  };

  obtenerTodosDestinos() {
    return this.http.get(`${this.API_URI}/index.php?tabla=destinos&op=getAll`);
  };
  
  crearDestino(data : any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=destinos&op=create`, data);
  };

  obtenerTodosLotes() {
    return this.http.get(`${this.API_URI}/index.php?tabla=lotes&op=getAll`);
  };

  obtenerTodosLoteActividad() {
    return this.http.get(`${this.API_URI}/index.php?tabla=lote_actividad&op=getAll`);
  };

  traerDatosExcel() {
    return this.http.get(`${this.API_URI}/excel.php`);
  };

  traerDatosExcelCrear() {
    return this.http.get(`${this.API_URI}/excelCrear.php`);
  };

  obtenerTodosSecuencia() {
    return this.http.get(`${this.API_URI}/index.php?tabla=secuencia&op=getAll`);
  };

  editarSecuencia(data : any) {
    return this.http.post(`${this.API_URI}/index.php?tabla=secuencia&op=update`, data);
  };


  obtenerTodosArticulos() {
    return this.http.get(`${this.API_URI}/index.php?tabla=articulos&op=getAll`);
  };

  obtenerTodosStockCampo() {
    return this.http.get(`${this.API_URI}/index.php?tabla=stock_campo&op=getAll`);
  };

  obtenerTodosStockItem() {
    return this.http.get(`${this.API_URI}/index.php?tabla=stock_item&op=getAll`);
  };

  editarStockItem(data : any){
    return this.http.post(`${this.API_URI}/index.php?tabla=stock_item&op=update`, data);
  }


}
