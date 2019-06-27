import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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

}
