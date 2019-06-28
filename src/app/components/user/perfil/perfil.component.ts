  
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // public usuario: any;
  constructor(
    public authService: AuthService,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    // this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

}
