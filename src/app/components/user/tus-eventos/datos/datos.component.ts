import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { EventoModel } from '../../../../models/evento/evento.model';
import { DatosEvento } from '../../../../models/evento/datosevento.model';
import { ServicioModel } from '../../../../models/evento/servicio.model';
declare var $;

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  public id: any;
  public evento: EventoModel;
  public datos: DatosEvento;
  public servicio: ServicioModel;


  constructor( 
    private ruta: ActivatedRoute,
    private _eventos: EventoService
    ) { 
    this.ruta.params.subscribe(params =>{
      this.id = params['id']
      this.evento = new EventoModel('','','','','','','','')
      this.datos = new DatosEvento('','','','','','','','','','')
      this.servicio = new ServicioModel('','','',{})
    })
    
  }
  
  ngOnInit() {
    
  }

  

  

  getServicio() {
    this._eventos.getServicioEvento(this.id).subscribe(
      response => {this.servicio = response;
      console.log(this.servicio); },
      error => { console.log(<object>error);}
    )
  }

}
