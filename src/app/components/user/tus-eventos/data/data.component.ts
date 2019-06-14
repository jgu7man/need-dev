import { Component, OnInit } from '@angular/core';
import { DatosEvento } from '../../../../models/evento/datosevento.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  public id: any;
  public datos: DatosEvento;

  constructor(
    private _Ruta: ActivatedRoute,
    private _evento: EventoService
  ) { 
    this.datos = new DatosEvento('','','','','','','','','','',);
    this._Ruta.parent.url.subscribe( url => {
      this.id = url[url.length -1].path
    })
  }

  ngOnInit() {
    this.getDatos();
  }

  getDatos(){
    this._evento.getDatosEvento(this.id).subscribe(
        response => {this.datos = response;},
        error => { console.log(<object>error);}
      )
  }

}
