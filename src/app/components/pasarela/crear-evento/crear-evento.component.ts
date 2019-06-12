import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosEvento } from '../../../models/evento/datosevento.model';
import { ServicioModel } from '../../../models/evento/servicio.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { EventoService } from 'src/app/services/evento.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {

date: Date = new Date();
settings = {
  bigBanner: true,
  timePicker: true,
  defaultOpen: false,
  closeOnSelect: true
}

  public servicio: ServicioModel;
  public datos: DatosEvento;
  public evento: EventoModel
  public Evento: string;
  public idEvento: any;


  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _Evento: EventoService,
    ) {
    this.datos = new DatosEvento('','','', '', '', '', '', '', '','');
    this.servicio = new ServicioModel( '', '', '', {});
    this.evento = new EventoModel('', '', '', '', '', '', '');
  }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      var evento = params.idEvento+'evento';
      var servicio = params.idEvento+'servicio';
      this.evento = JSON.parse(localStorage.getItem(evento));
      this.servicio = JSON.parse(localStorage.getItem(servicio));
    });
    this.stringer();
  }
  
  stringer() {
    this.evento.id = this.evento.id.toString();
    this.servicio.id = this.servicio.id.toString();
    
    console.log(this.evento, this.servicio);
  }

  onSubmit(){

    this.datos.id = this.idEvento;
    localStorage.setItem(this.idEvento+'datos', JSON.stringify(this.datos));
    
    this._Evento.postEvento(this.evento).subscribe(
      response => { console.log(response);},
      error => { console.log(<any>error);}
    );
    
    this._Evento.postDatos(this.datos).subscribe(
      response => { console.log(response); },
      error => { console.log(<any>error); }
    );


    this._Evento.postServicio(this.servicio).subscribe(
      response => {console.log(response);},
      error => {console.log(<any>error);}
    );
  }




}


