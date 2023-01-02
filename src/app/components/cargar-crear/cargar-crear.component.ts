import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var vars: any;

@Component({
  selector: 'app-cargar-crear',
  templateUrl: './cargar-crear.component.html',
  styleUrls: ['./cargar-crear.component.css']
})
export class CargarCrearComponent implements OnInit {

  API_URI = vars.API_URI;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onUpload(event:any) {
    this.router.navigate(['/verXlsxCrear'])
  }

}
