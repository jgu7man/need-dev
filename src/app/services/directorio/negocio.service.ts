import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NegocioModel } from '../../models/direcorio/negocio.model';
import { Observable } from 'rxjs';
import { UrlApi } from "../../log/url-api";


@Injectable({
    providedIn: 'root'
})
export class NegocioService {


    constructor(
        private http: HttpClient,
    ){}

    saveNegocio( negocio: NegocioModel): Observable<any> {
        let params = JSON.stringify(negocio);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(UrlApi.local+'saveNegocio', params, {headers: headers});
    }

    updateNegocio( negocio: NegocioModel): Observable<any> {
        var id = negocio.idNegocio
        let params = JSON.stringify(negocio);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(UrlApi.local+'updateNegocio/'+id, params, {headers: headers});
    }

    getNegocio( idNegocio: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(UrlApi.local+'getNegocio/'+idNegocio,  {headers: headers});
    }

    

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        return new Promise( (resolve, reject) => {
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            if ( files ) {

                for( var i = 0; i < files.length; i++) {
                    formData.append(name, files[i], files[i].name);
                }
    
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                }
                xhr.open('POST', url, true);
                xhr.send(formData);
            }
        });
    }

    rate(id: string, rate: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(UrlApi.local+'rate/'+id+'/'+rate, {headers: headers});
    }

    rating(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(UrlApi.local+'get-ratings/'+id, {headers: headers});
    }

    rater(id: string, rater: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(UrlApi.local+'get-rater/'+id+'/'+rater, {headers: headers});
    }

    comentar(id: string, comentario: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(UrlApi.local+'comentar/'+id+'/'+comentario, {headers: headers});
    }

    getComentarios(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(UrlApi.local+'getComentarios/'+id, {headers: headers});
    }
}
