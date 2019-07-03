import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: any;
  public userNegocios: any;
  public eventos: any;
  public votos: any;
  constructor(
    private _usuario: UsuarioService
  ) { }

  ngOnInit() {
    this.userNegocios = false;
    this.usuario = JSON.parse(localStorage.getItem('login'));
    this._usuario.getNegocioUser(this.usuario.userId).subscribe(
      res => {this.userNegocios = res.negocios;});
    this._usuario.getEventosUser(this.usuario.userId).subscribe(
      res => {this.eventos = res.eventos;})
    this.votos = 0;
  }

}
