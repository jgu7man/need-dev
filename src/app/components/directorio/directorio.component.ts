import { Component, OnInit } from '@angular/core';
import { CategoriasDirectorioService } from 'src/app/services/categorias.directorio.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  public categorias:any;
  constructor(
    private _categorias: CategoriasDirectorioService,
  ) { }

  ngOnInit() {
    this.categorias = this._categorias.getCategorias()
  }

  

}
