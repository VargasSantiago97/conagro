import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as vars from 'globals';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css']
})
export class CargarComponent implements OnInit {

  API_URI = vars.API_URI;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onUpload(event:any) {
    this.router.navigate(['/verxlsx'])
  }

}
