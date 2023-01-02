import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
declare var vars: any;

var API_URI = vars.API_URI_CONAGRO

@Component({
  selector: 'app-cp',
  templateUrl: './cp.component.html',
  styleUrls: ['./cp.component.css']
})
export class CpComponent implements OnInit {

  socio:any;
  cp:any;

  link:any;

  constructor(
    private route: ActivatedRoute, router: RouterLink
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.socio = params['socio'];
      this.cp = params['cp'].substring(8);

      this.link = API_URI + "/pdf.php?socio=" + this.socio+ "&nro=" + this.cp;
    });

  }

}
