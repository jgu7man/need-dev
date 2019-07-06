import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlApi } from "../log/url-api";

@Injectable()
export class UsuarioService {

    public usuario: UsuarioModel;
    constructor(
        private _http: HttpClient,
        private _Router: Router
        ) {
            this.usuario = new UsuarioModel('','','','');
        }

    ngOnInit(): void {
        this.login();
    }

    registrar( usuario: UsuarioModel ): Observable<any> {
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(UrlApi.heroku+'social-login', params, {headers: headers});
    }

    login(){
        var loged = JSON.parse(localStorage.getItem('login'));
        if(loged == null ) {
            this._Router.navigate(['/login/'])
          } else {
            this.usuario = JSON.parse(localStorage.getItem('login'));
            }
    }

    getNegocioUser( idUser: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'neg-de-usuario/'+idUser, {headers: headers});
    }

    getEventosUser( idUser: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'eve-de-usuario/'+idUser, {headers: headers});
    }

    session(){
        // console.log(this.usuario);
        return this.usuario
    }

}