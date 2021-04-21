import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ModalChangeImageService {

   private _hiddenModal: boolean = true;

   public type: 'users' | 'medicos' | 'hospitals';
   public uid: string = '';

   private _typeObject: any;

   constructor() {
   }

   get hiddenModal() {

      return this._hiddenModal;

   }

   get refImg() {
      return this._typeObject.img;
   }

   set refImg(value) {
      this._typeObject.img = value;
   }

   /**
    *
    * @param type: {string} Determina a quien se la va a cambiar la imagen
    * @param uid: {string} Deterina el id del 'users' | 'medicos' | 'hospitals'
    * @param typeObject: {Object} Objeto del tipo 'users' | 'medicos' | 'hospitals'
    * Este Objeto tiene una propiedad o key llamada img donde se almacena el nombre
    * de la imagen, si se cambia el valor de esa key cambiara donde esté vinculada
    * esa key, por eso Ejemplo: no es necesario recargar las tablas de los usuarios
    * para mostrar la nueva imagen, cambia en automático por referencia, también pude
    * haberlo echo con un EventEmitter en algún servicio en el que me suscribiera
    * para saber cuando se ha subido la imagen y tomar alguna accion al respecto,
    * en fin.
    *
    */
   openModal(type: 'users' | 'medicos' | 'hospitals', uid: string, typeObject: Object): void {

      this.type = type;
      this.uid = uid;
      this._typeObject = typeObject;

      this._hiddenModal = false;
   }

   closeModal() {
      this._hiddenModal = true;
   }

}
