import { Injectable, NgZone } from '@angular/core';
import { Usuario } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = {
          email: user.email,
          nombre: user.displayName,
          avatar: user.photoURL
        }
        localStorage.setItem('usuario', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('usuario'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('usuario'));
      }
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(["/usuario/perfil/"]);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      console.log(error);
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const userData: Usuario = {
      email: user.email,
      nombre: user.displayName,
      avatar: user.photoURL,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    })
  }

}