import { Component, OnInit, Inject } from '@angular/core';
import { NegocioModel } from 'src/app/models/direcorio/negocio.model';
import { CategoriasDirectorioService } from 'src/app/services/directorio/categorias.service';
// import { FirebaseApp } from "angularfire2";
// import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireStorage } from "angularfire2/storage";


@Component({
  selector: 'app-suscribir',
  templateUrl: './suscribir.component.html',
  styleUrls: ['./suscribir.component.css']
})
export class SuscribirComponent implements OnInit {

  public categorias: any;
  public negocio: NegocioModel;
  image: string
  constructor(
      private _categorias: CategoriasDirectorioService,
      // @Inject(FirebaseApp) firebaseApp: any,
      // private firebaseApp: FirebaseApp
  ) { 
    this.negocio = new NegocioModel('','','','','','','','','','','','',[]);
    // const storageRef = firebaseApp.storage().ref().child('images/image.png');
    // storageRef.getDownloadURL().then(url => this.image = url);
   }

  ngOnInit() {
    this.categorias = this._categorias.getCategorias()
  }

  imagen(fileInput: any){
    var reader = new FileReader();
    reader.onload = function() {
      var image:any = document.querySelector('#imagenNegocio');
      image.src = reader.result
    }
    reader.readAsDataURL(fileInput.target.files[0]);
    
      const file = fileInput.target.files[0]
      // const storageRef = this.firebaseApp.storage().ref('perfilNegocios/' + file.name);
      // storageRef.getDownloadURL().then(url => console.log(url))
      // const task = this.firebaseApp.storage.upload('perfilNegocios/' + file.name, file);

      // task.snapshotChanges().pipe(
      //   finalize(() => this.negocio.imgPerfil = storageRef.getDownloadURL())
      // ).subscribe()
  }

  onSubmit(){
    console.log(this.negocio)
  }

}
