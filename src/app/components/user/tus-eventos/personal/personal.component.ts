import { Component, OnInit } from '@angular/core';
import { ServicioModel } from '../../../../models/evento/servicio.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { ExtrasModel } from '../../../../models/evento/extras.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public id: any;
  public servicio: ServicioModel;
  public extras: ExtrasModel;
  public keys:any;
  public values:any;

  constructor(
    private _Ruta: ActivatedRoute,
    private _evento: EventoService
  ) { 
    this.servicio = new ServicioModel('','','',{});
    this.extras = new ExtrasModel(0,0,0,0,0)
    this._Ruta.parent.url.subscribe( url => {
      this.id = url[url.length -1].path;
    })
  }

  ngOnInit() {
    this.getServicio();
  }

  getServicio(){
    this._evento.getServicioEvento(this.id).subscribe(
      res => { this.servicio = res; 
        (Object.entries(this.servicio.extras)).forEach(([key, value]) => {
          Object.defineProperty(this.extras,key,
            {value: value, enumerable: true,configurable: true,writable: true});
          })
        console.log(this.extras);
       },
      err => {console.log(<any>err);}
    )
  }

}
