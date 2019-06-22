import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { UsuarioModel } from "../models/usuario.model";
import { Observable } from "rxjs";

interface usuario {
  name: string,
  email: string,
  avatar: string
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  userCollection: AngularFirestoreCollection<usuario>;
  user: Observable<usuario[]>;

  constructor( private afs: AngularFirestore ) {}

   registrar( ) {
     
    this.userCollection = this.afs.collection('usuarios')
    //  this.firestore.collection('usuarios').doc( usuario.email ).set({
    //    email: usuario.email,
    //    nombre: usuario.name,
    //    avatar: usuario.avatar,
    //  })
   }
   


}
