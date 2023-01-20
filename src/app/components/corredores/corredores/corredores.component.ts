import { Component, OnInit } from '@angular/core';
import { ComunicacionConagroService } from 'src/app/services/comunicacion-conagro.service';

@Component({
  selector: 'app-corredores',
  templateUrl: './corredores.component.html',
  styleUrls: ['./corredores.component.css']
})
export class CorredoresComponent implements OnInit {

  spinner:Boolean = true;
  displayModalCorredor:Boolean = false;

  corredores:any = [];
  corredorSeleccionado:any = {};

  constructor(private comunicacionConagroService: ComunicacionConagroService) { }

  ngOnInit(): void {
    this.obtenerTodosCorredores()
    console.log(this.comunicacionConagroService.getValue())
  }

  obtenerTodosCorredores(){
    this.comunicacionConagroService.obtenerTodosCorredores().subscribe(
      (res:any) => {
        this.corredores = res;
        this.spinner = false;
      },
      (err:any) => {
        console.log(err)
      }
    );
  }

  mostrarCorredor(corredor_id:any){
    if(corredor_id != 0){
      this.corredorSeleccionado = this.corredores.find((e:any)=>{return e.id == corredor_id})
    }else{
      this.corredorSeleccionado = {
        nombre: '',
        razon_social: '',
        cuit: '',
        id: 0
      }
    }

    this.displayModalCorredor = true;
  }

  guardarCorredor(){
    this.displayModalCorredor = false;
    if(this.corredorSeleccionado.id==0){
      this.comunicacionConagroService.crearCorredores(this.corredorSeleccionado).subscribe(
        (res:any)=>{
          console.log(res);
        },
        (err:any)=>{
          alert('Error')
          console.log(err);
        }
      );
    } else {
      this.comunicacionConagroService.modificarCorredores(this.corredorSeleccionado).subscribe(
        (res:any)=>{
          console.log(res);
        },
        (err:any)=>{
          alert('Error')
          console.log(err);
        }
      );
    }
  }

}
