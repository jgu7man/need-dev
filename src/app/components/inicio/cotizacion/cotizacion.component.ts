import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosEvento } from '../../../models/evento/datosevento.model';
import { ServicioModel } from '../../../models/evento/servicio.model';
import { PreciosPersonalModel } from "../../../models/precios.personal.model";
import { PreciosPersonal } from '../../../models/precios.personal';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ExtrasModel } from '../../../models/evento/extras.model';
import { UsuarioModel } from '../../../models/usuario.model';
declare var $

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  public servicio: ServicioModel;
  public evento: EventoModel;
  public extras: ExtrasModel;
  public usuario: UsuarioModel;
  public precios = PreciosPersonal;
  public total: number;
  public idEvento:any;
  
  public pMesero: number; public pJefe: number; public pBarman: number; public pBarra: number; public pValet: number;  public pHostess: number; public pSeguridad: number;

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
  ) {
    this.servicio = new ServicioModel( '', 0, 0, []);
    this.evento = new EventoModel('', '', 0, 0, 0, 0, '','');
    this.extras = new ExtrasModel(0, 0, 0, 0, 0);
    this.usuario = new UsuarioModel('', '', '', '');
   }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      var evento = params.idEvento+'evento';
      var servicio = params.idEvento+'servicio';
      var extras = params.idEvento+'extras';
      this.evento = JSON.parse(localStorage.getItem(evento));
      this.servicio = JSON.parse(localStorage.getItem(servicio));
      this.extras = JSON.parse(localStorage.getItem(extras));
    });  
  }
    
  getExtras() {
    if (this.extras.barman > 0 ) {
      Object.defineProperty(this.servicio.extras, 'barman', 
      {value: this.extras.barman,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.barra > 0 ) {
      Object.defineProperty(this.servicio.extras, 'barra', 
      {value: this.extras.barra,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.valet > 0 ) {
      Object.defineProperty(this.servicio.extras, 'valet', 
      {value: this.extras.valet,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.hostess > 0 ) {
      Object.defineProperty(this.servicio.extras, 'hostess', 
      {value: this.extras.hostess,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.seguridad > 0 ) {
      Object.defineProperty(this.servicio.extras, 'seguridad', 
      {value: this.extras.seguridad,enumerable: true,configurable: true,writable: true});
    }
    
  }

  contratar(){
    this.getExtras();
    this.total = +$('#total').text();
    this.evento.costo = this.total;
    
    
    localStorage.setItem(this.idEvento+'servicio', JSON.stringify(this.servicio));
    localStorage.setItem(this.idEvento+'extras', JSON.stringify(this.extras));

    var log = JSON.parse(localStorage.getItem('login'));
    this.usuario = JSON.parse(localStorage.getItem('login'));
    
    if (log == null) {
      this._Router.navigate(['login/'+this.idEvento]);
    } else {
      this.evento.usuario = this.usuario.userId;
      localStorage.setItem(this.idEvento+'evento', JSON.stringify(this.evento));
      this._Router.navigate(['crear-evento/'+this.idEvento]);
    }

  }

}
