import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from "ng4-social-login";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioModel } from "src/app/models/usuario.model";
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventoModel } from 'src/app/models/evento/evento.model';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {


  public user:any = SocialUser;
  public usuario: UsuarioModel;
  public evento: EventoModel;
  public idEvento: any;

  constructor(
    private _socialAuth: AuthService,
    private _usuario: UsuarioService,
    private _Route: ActivatedRoute,
    private _Router: Router
  ) { 
    this.evento = new EventoModel('', '', 0, 0, 0, 0, '','')
   }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      var evento = params.idEvento+'evento';
      this.evento = JSON.parse(localStorage.getItem(evento));
  })}

  fbLogin(){
    this._socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((userData) => {
      this.user = userData;
      this.login();
    });
  }

  async goLogin(){
    await this._socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        this.user = userData;
        this.login();
      })
  }

  async login() {
    var nombre = this.user.name;
    var email = this.user.email;
    var avatar = this.user.photoUrl;
    
    this.usuario = new UsuarioModel('', email, nombre, avatar);

    await this._usuario.registrar(this.usuario).subscribe(
      response => {
        console.log(response)
        this.usuario.userId = response.id;
        this.usuario.nombre = response.data.nombre;
        this.usuario.email = response.data.email;
        this.usuario.avatar = response.data.avatar;
        localStorage.setItem( "login", JSON.stringify(this.usuario));
        this.reload();
      },
      error => {
        console.log(<any>error);
        this.reload();
      }
      )
  }

  reload(){
    var url = window.location.href;
    var id = this.idEvento
    var router = this._Router
    if ( url.includes(id) ){
      var user = JSON.parse(localStorage.getItem('login'))
      this.evento.usuario = user.userId;
      localStorage.setItem(this.idEvento+'evento', JSON.stringify(this.evento));
      
    }
    
    function reloadCrear(){
      router.navigate(['crear-evento/'+id])
    }

    function reloadPerfil(){
      router.navigate(["/usuario/perfil/"]); 
    }
    
    setTimeout(
      function redirigir()  {
        var loged = localStorage.getItem('login');
        
        if (loged == null) {
          console.log('aun no se logea');
        } else if ( url.includes(id) ){
          
          console.log('se creará evento');
          reloadCrear();
        } else {
          console.log('se dirige al dashboard');
          reloadPerfil()
        }
      },1000)
  }

  

}
