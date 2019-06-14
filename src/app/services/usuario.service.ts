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
        // console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(UrlApi.heroku+'social-login', params, {headers: headers});
    }

    login(){
        var loged = JSON.parse(localStorage.getItem('login'));
        // console.log(loged);
        if(loged == null ) {
            this._Router.navigate(['/login/'])
          } else {
            this.usuario = JSON.parse(localStorage.getItem('login'));
            }
            // console.log(this.usuario);
    }

    session(){
        // console.log(this.usuario);
        return this.usuario
    }

    
}