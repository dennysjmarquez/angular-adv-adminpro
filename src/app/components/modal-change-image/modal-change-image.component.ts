import {Component, ViewChild, Input, SimpleChanges} from '@angular/core';
import {ModalChangeImageService} from './services/modal-change-image.service';
import {environment} from '@env';
import Swal from 'sweetalert2';
import {FileUploadService} from 'src/app/services/file-upload.service';

// Services

@Component({
   selector: 'app-modal-change-image',
   templateUrl: './modal-change-image.component.html',
   styles: [
      `

         .img-fluid {
            max-height: 300px;
         }

      `]
})
export class ModalChangeImageComponent {

   @ViewChild('file') file;
   @Input('hiddenModal') hiddenModal: boolean = false;
   imagenUserUpLoad: File;

   public type: 'users' | 'medicos' | 'hospitals';
   public previImagen: string = '';


   constructor(
      private _modalChangeImageService: ModalChangeImageService,
      private _fileUploadService: FileUploadService
   ) {
   }

   ngOnChanges(changes: SimpleChanges) {

      if (changes.hasOwnProperty('hiddenModal') && !changes.hiddenModal.currentValue) {

         this.type = this._modalChangeImageService.type;
         this.previImagen = this._modalChangeImageService.refImg;

         this.getImagen();


      }

   }

   handleFileInput(file: File) {

      if (!file) {

         this.imagenUserUpLoad = null;
         return;

      }

      const reader = new FileReader();

      this.imagenUserUpLoad = file;
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
         this.previImagen = event.target.result;
      };

   }

   getImagen() {

      this.previImagen = this.previImagen && this.previImagen.includes('://')
         ? this.previImagen
         : `${environment.baseUrl}/upload/${this.type}/${this.previImagen || 'no-imagen'}`;

   }

   clickFile() {

      const fileUpload = this.file.nativeElement;
      fileUpload.onchange = () => this.imagenUserUpLoad;

      this.file.nativeElement.click();

   }

   onUpFile() {

      if (!this.imagenUserUpLoad) {
         return;
      }

      this._fileUploadService.upLoad(this.imagenUserUpLoad, this.type, this._modalChangeImageService.uid)

         .subscribe(({nameFile}) => {

               this._modalChangeImageService.refImg = nameFile;

               Swal.fire({
                  title: 'Atención!',
                  text: 'Su imagen fue actualizada, con éxito ',
                  icon: 'success',
                  confirmButtonText: 'Ok'
               });

               this.file.nativeElement.value = null;
               this.imagenUserUpLoad = null;

               this.closeModal();

            },
            error => {

               Swal.fire({
                  title: 'Error!',
                  text: error.error.msg,
                  icon: 'error',
                  confirmButtonText: 'Ok'
               });

            });

   }

   closeModal() {

      this.previImagen = '';
      this._modalChangeImageService.closeModal();
   }

}
