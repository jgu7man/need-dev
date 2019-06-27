import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public catego: any;
  constructor(
    private _ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this._ruta.params.subscribe( params => {
      this.catego = params['name']
    })
  }

}
