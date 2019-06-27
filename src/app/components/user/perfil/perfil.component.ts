import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: any;
  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('login'));
  }

}
