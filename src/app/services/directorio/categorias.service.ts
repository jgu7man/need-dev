import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoriasDirectorioService {

    public Categorias:any[] = [
        {id:'floreria', name: 'Florerías', imagen: '../../../../assets/img/caja-con-flores.jpg'},
        {id:'fotografos', name: 'Fotógrafos', imagen: '../../../../assets/img/fotografos1.jpg'},
        {id:'vestidos', name: 'Vestidos', imagen: '../../../../assets/img/vestidos.jpg'},
        {id:'pastelerias', name: 'Pastelerías', imagen: '../../../../assets/img/pasteleria.jpg'},
        {id:'locales', name: 'Locales', imagen: '../../../../assets/img/locales.jpg'},
        {id:'banquetes', name: 'Banquetes', imagen: '../../../../assets/img/banquetes.jpg'},
        {id:'decoracion', name: 'Decoración', imagen: '../../../../assets/img/decoracion.jpg'},
        {id:'ceremonia', name: 'Ceremonias', imagen: '../../../../assets/img/ceremonias.jpg'},
        {id:'cocina', name: 'Cocina', imagen: '../../../../assets/img/cocina.jpg'},
        {id:'mobiliario', name: 'Mobiliario', imagen: '../../../../assets/img/mobiliario.jpg'},
        {id:'organizadores', name: 'Organizadores', imagen: '../../../../assets/img/organizadores.jpg'},
        {id:'vinos', name: 'Vinos y licores', imagen: '../../../../assets/img/vinos.jpg'},
        {id:'otros', name: 'Otros', imagen: '../../../../assets/img/1-17.jpg'},
    ]

    getCategorias(){
        return this.Categorias;
    }

}