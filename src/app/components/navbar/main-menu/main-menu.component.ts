import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
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
  
  constructor(public authService: AuthService) { }

  ngOnInit() {
    var loged = JSON.parse(localStorage.getItem('usuario'));
    if (loged == null ) {
      this.cerrarLink = false
    } else {
      this.uneteLink = false
    }
  }

  cerrarSesion(){
    localStorage.removeItem("login");
    window.location.href = '/'
  }

}
