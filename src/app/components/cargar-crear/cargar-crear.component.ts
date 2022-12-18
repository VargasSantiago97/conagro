import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as vars from 'globals';

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
