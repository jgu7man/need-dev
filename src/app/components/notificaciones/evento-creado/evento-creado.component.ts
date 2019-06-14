import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { EventoModel } from '../../../models/evento/evento.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-evento-creado',
  templateUrl: './evento-creado.component.html',
  styleUrls: ['./evento-creado.component.css']
})
export class EventoCreadoComponent implements OnInit {

  public evento: any;
  public idEvento: any;

  constructor(
    private _evento: EventoService,
    private _Router: Router,
    private _Route: ActivatedRoute
    ) {
    this.evento = new EventoModel('', '', '', '', '', 0, '','');
   }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
    })
    this.getEvento(this.idEvento);
  }

  getEvento(id){
    this._evento.getEventoSolo(id).subscribe(
      response => { 
        this.evento = response
        console.log(this.evento);
      },
      error => {console.log(<any> error);}
    );
  }

}
