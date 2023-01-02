import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var vars: any;

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
