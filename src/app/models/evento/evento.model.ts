export class EventoModel {

    constructor(
        public id: string,
        public usuario: string,
        public tipoEvento: any ,
        public personas: any ,
        public calidad: any ,
        public costo: any
    ){}
}