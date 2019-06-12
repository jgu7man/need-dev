import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

    constructor(private _http: HttpClient) {}

    registrar( usuario: UsuarioModel ): Observable<any> {
        let params = JSON.stringify(usuario);
        // console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post('http://localhost:3800/social-login', params, {headers: headers});
    }
}