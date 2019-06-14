import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';
import { EventoModel } from '../../../models/evento/evento.model';
import { DatosEvento } from 'src/app/models/evento/datosevento.model';
import { ServicioModel } from '../../../models/evento/servicio.model';

declare var $;

@Component({
  selector: 'app-tus-eventos',
  templateUrl: './tus-eventos.component.html',
  styleUrls: ['./tus-eventos.component.css']
})
export class TusEventosComponent implements OnInit {

  public usuario: UsuarioModel;
  public eventos: EventoModel[];
  public datos: DatosEvento;
  public servicio: ServicioModel
  public evento: any;
  public more: boolean = false;

  constructor(
    private _usuario: UsuarioService,
    private _eventos: EventoService
  ) {
    this.evento = new EventoModel('','','','','','','',''),
    this.datos = new DatosEvento('','','','','','','','','',''),
    this.servicio = new ServicioModel('','','',{})
  }

  ngOnInit() {
    this._usuario.login();
    this.usuario = this._usuario.session();
    this.getEventos(this.usuario.userId);
  }

  getEventos(userId: string){
    this._eventos.getEventos(userId).subscribe(
      response => { this.eventos = response;},
      error => { console.log(<any>error)}
    )
    
  }

  

  

}
