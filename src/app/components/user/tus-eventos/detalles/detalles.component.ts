import { Component, OnInit } from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { EventoService } from '../../../../services/evento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public id: any;
  public evento: EventoModel
  constructor( 
    private _evento: EventoService,
    private _Ruta: ActivatedRoute
    ) {
    this.evento = new EventoModel('','','','','','','','');
    this._Ruta.parent.url.subscribe( params => {
      this.id = params[params.length -1].path
      console.log(this.id);
    })
   }

  ngOnInit() {
    this.getEvento();
  }

  getEvento(){
    this._evento.getEventoSolo(this.id).subscribe(
        response => {this.evento = response;},
        error => { console.log(<object>error);}
      )
  }

}
