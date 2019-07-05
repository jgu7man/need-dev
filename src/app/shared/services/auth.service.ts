import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user.model";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, of, pipe } from 'rxjs';
import { switchMap, map, take, tap, mapTo } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlApi } from 'src/app/log/url-api';
import { fromPromise  } from 'rxjs/observable/fromPromise';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  user$: Observable<User>;

  constructor(
    private _http: HttpClient,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      take(1),
      switchMap( user => {
        //usuario logeado
        if(user){
          console.log('Entre esta vez!');
          return this.getUserData(user.uid).pipe(
            map(data => {
              return data.usuario;
            })
          )
        } else {
          //No logueado
          return of(null);
        }
      })
    )
      // .pipe(
      //   switchMap(user => {
      //       // Logged in
      //     if (user) {
      //       return this.afs.doc<User>(`usuarios/${user.uid}`).valueChanges();
      //     }else {
      //       // Logged out
      //       return of(null);
      //     }
      //   })
      // )
  }
  async GoogleAuth() {
    const provider = new auth.GoogleAuthProvider();
    let credential: any;
    try {
      credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log('entre al error y regrese:' + err.message)
      return new Error(err);
    }
    
    return this.updateUserData(credential.user);
  }
  //regresa promise pues es una async/await function
  private async updateUserData(user): Promise<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
   
    this.getIdToken().then(token => {
      const data = { 
        uid: user.uid, 
        email: user.email, 
        nombre: user.displayName, 
        avatar: user.photoURL,
        userToken: token
      } 
      console.log(data)
      return this._http.post(UrlApi.local +'social-login', data , {headers: headers}).subscribe(userData => {
        if(userData){
          this.router.navigate(['/usuario/perfil']);
        }
        console.log(userData);
      })
    }).catch(err => {
      console.log(err.message)
    })

    

  }
  private getUserData(uid: string): Observable<any>{
    
    let tokenUser:string = null;

    this.getIdToken().then(token => {
      tokenUser = token;
    });
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `${tokenUser}`
        })
    };
    console.log(tokenUser);
    return this._http.get(UrlApi.local + `getUser/${uid}`, httpOptions);
  }
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  
  async getIdToken():Promise<string>{
    return await this.afAuth.auth.currentUser.getIdToken(true)
      .then(token => {
        return token;
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }
}