import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventoModel } from '../models/evento/evento.model';
import { Observable } from 'rxjs';
import { ServicioModel } from '../models/evento/servicio.model';
import { DatosEvento } from '../models/evento/datosevento.model';
import { UrlApi } from "../log/url-api";


@Injectable()
export class EventoService {
    constructor(private _http: HttpClient){}

    postEvento( evento: EventoModel): Observable<any> {
        let params = JSON.stringify(evento);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(UrlApi.heroku+'saveEvento', params, {headers: headers});
    }

    postServicio( servicio: ServicioModel): Observable<any> {
        let params = JSON.stringify(servicio);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(UrlApi.heroku+'saveServicio', params, {headers: headers});
    }

    postDatos( Datos: DatosEvento): Observable<any> {
        let params = JSON.stringify(Datos);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(UrlApi.heroku+'saveDatos', params, {headers: headers});
    }

    getEventos( userId: string ): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'getEventos/'+userId, {headers: headers});
    }

    getEventoSolo( id: string ):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'eventoSolo/'+id, {headers: headers});
    }

    getDatosEvento( id: string ):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'datosEvento/'+id, {headers: headers});
    }

    getServicioEvento( id: string ):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(UrlApi.heroku+'servicioEvento/'+id, {headers: headers});
    }

}