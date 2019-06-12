import { Component, OnInit } from '@angular/core';
import { ServicioModel } from '../../../models/evento/servicio.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { ExtrasModel } from '../../../models/evento/extras.model';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-heroform',
  templateUrl: './heroform.component.html',
  styleUrls: ['./heroform.component.css']
})

export class HeroformComponent implements OnInit  {
  
  public servicio: ServicioModel;
  public evento: EventoModel
  public extras: ExtrasModel;

  constructor( 
    private Router: Router
  ) { 
    this.servicio = new ServicioModel(0, 0, 0, {});
    this.evento = new EventoModel('', '', 0, 0, 1, 0)
    this.extras = new ExtrasModel(0, 0, 0, 0, 0)
  }
  
  ngOnInit() {
  }
  
  public popup() {
    $(".popup").slideToggle();
  }

  calcular() {
    var tipo:number = +this.evento.tipoEvento;
    var calidad:number = +this.evento.calidad;
    var cant:number = this.evento.personas;
    var cantidad:number;
    
    if(tipo < 4) {
      switch(calidad) {
        case 1: 
        cantidad = cant/20;
        break;
        case 2: 
        cantidad = cant/30;
        break;
        case 3: 
        cantidad = cant/40;
        break;
        default: "none";
      }
      var jefe = cant/200;
  
    }else if(tipo > 3) {
        switch(calidad) {
          case 1: 
          cantidad = cant/30;
          break;
          case 2: 
          cantidad = cant/40;
          break;
          case 3: 
          cantidad = cant/50;
          break;
          default: "none;"
        }
        var jefe = 0;
      }else { };

    var m = Math.ceil(cantidad);
    this.servicio.meseros = m;
    
    var j = Math.ceil(jefe);
    this.servicio.jefeMeseros = j;

    this.evento.tipoEvento = tipo;
    this.evento.calidad = calidad;
    
    console.log(this.servicio, this.evento);
  }

  calcular2() {

    var tipo:number = +this.evento.tipoEvento;
    var calidad:number = +this.evento.calidad;
    var cant:number = this.evento.personas;
    var cantidad:number;

    
      switch(calidad) {
        case 2: 
        cantidad = cant/20;
        break;
        case 3: 
        cantidad = cant/30;
        break;
        case 4: 
        cantidad = cant/40;
        break;
        case 5: 
        cantidad = cant/50;
        break;
        default: "none;"
      }

    var m = Math.ceil(cantidad);
    this.servicio.meseros = m;
    this.servicio.jefeMeseros = +this.servicio.jefeMeseros;

    this.evento.tipoEvento = tipo;
    this.evento.calidad = calidad;
    
    
  }

  string(){
    // STRING TIPO DE EVENTO
    if ( this.evento.tipoEvento === 1 ) {
      this.evento.tipoEvento = 'Boda';
    } else if ( this.evento.tipoEvento === 2 ) {
      this.evento.tipoEvento = 'XV años';
    } else if ( this.evento.tipoEvento === 3 ) {
      this.evento.tipoEvento = 'Graduación';
    } else if ( this.evento.tipoEvento === 4 ) {
      this.evento.tipoEvento = 'Cumpleaños';
    } else if ( this.evento.tipoEvento === 5 ) {
      this.evento.tipoEvento = 'Convivio';
    } else if ( this.evento.tipoEvento === 6 ) {
      this.evento.tipoEvento = 'Posada';
    } else {
      this.evento.tipoEvento = 'Otro tipo';
    }

    // STRING CALIDAD
    if ( this.evento.calidad === 1 ) {
      this.evento.calidad = 'Óptima';
    } else if ( this.evento.calidad === 2 ) {
      this.evento.calidad = 'Regular';
    } else if ( this.evento.calidad === 3 ) {
      this.evento.calidad = 'Deficiente';
    } else {
      // do nothing
    }

    console.log(this.evento);
  }

  


  onSubmit() {
    this.string();
    if(this.evento.tipoEvento == 7 ) {
      this.calcular2();
    }

    var id:any = new Date();
    var idEvento:any = +id.getTime();
    this.evento.id = idEvento;
    this.servicio.id = idEvento;
    console.log(this.servicio, this.evento);

    localStorage.setItem(idEvento+'servicio', JSON.stringify(this.servicio));
    localStorage.setItem(idEvento+'evento', JSON.stringify(this.evento));
    localStorage.setItem(idEvento+'extras', JSON.stringify(this.extras));
    this.Router.navigate(['/cotizacion/'+idEvento]);
    // window.location.href = "/cotizacion/"+idEvento; 

  }
}
