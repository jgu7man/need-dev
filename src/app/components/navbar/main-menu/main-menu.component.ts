import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public uneteLink: boolean = true;
  public provLink: boolean = true;
  public conocenosLink: boolean = true;
  public preciosLink: boolean = true;
  public cerrarLink: boolean = true;
  @Output() cerrarMenu = new EventEmitter();
  constructor(
    private _ruta: Router
  ) { }

  ngOnInit() {
    var loged = JSON.parse(localStorage.getItem('login'));
    if (loged == null ) {
      this.cerrarLink = false
    } else {
      this.uneteLink = false
    }
  }

  async cerrarSesion(){
    await localStorage.removeItem("login");
    window.location.href = '/'

  }

  toggleMenu(){
    $("#menu").toggleClass('opened')
    $("#close").toggle();
    this.cerrarMenu.emit(false)
  }
}
