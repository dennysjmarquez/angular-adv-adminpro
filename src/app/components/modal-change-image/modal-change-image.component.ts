import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {environment} from '@env';
import Swal from 'sweetalert2';
import {FileUploadService} from 'src/app/services/file-upload.service';

// Services
import {AuthService} from '../../services/auth.service';

@Component({
   selector: 'app-modal-change-image',
   templateUrl: './modal-change-image.component.html',
   styles: [
      `
         .img-fluid {
            max-height: 300px;
         }
      `,
   ],
})
export class ModalChangeImageComponent {
   @ViewChild('file') file;

   @Input('type') type: 'users' | 'medicos' | 'hospitals';
   @Input('refModel') refModel: any;

   @Input('openModal') openModal: boolean = false;
   @Output('onClose') onClose = new EventEmitter<any>();

   imagenUserUpLoad: File;
   public prevImagen: string = '';
   private _typeRefImg: any;

   constructor(private _fileUploadService: FileUploadService, private _authService: AuthService) {
   }

   get refImg() {
      return this._typeRefImg.img;
   }

   set refImg(value) {
      this._typeRefImg.img = value;
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes.hasOwnProperty('openModal') && changes.openModal.currentValue) {
         this._typeRefImg = this.refModel;
         this.prevImagen = this.refImg;
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
         this.prevImagen = event.target.result;
      };
   }

   getImagen() {
      this.prevImagen =
         this.prevImagen && this.prevImagen.includes('://')
            ? this.prevImagen
            : `${environment.baseUrl}/upload/${this.type}/${this.prevImagen || 'no-imagen'}`;
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

      this._fileUploadService
         .upLoad(this.imagenUserUpLoad, this.type, this.refModel.uid)

         .subscribe(
            ({nameFile}) => {
               this.refImg = nameFile;
               this._authService.currentUser.img = nameFile;

               Swal.fire({
                  title: 'Atención!',
                  text: 'Su imagen fue actualizada, con éxito ',
                  icon: 'success',
                  confirmButtonText: 'Ok',
               });
               this.file.nativeElement.value = null;
               this.imagenUserUpLoad = null;
               setTimeout(() => this.closeModal(true), 100);
            },
            (error) => {
               Swal.fire({
                  title: 'Error!',
                  text: error.error.msg,
                  icon: 'error',
                  confirmButtonText: 'Ok',
               });
            }
         );
   }

   closeModal(upFile: boolean = false) {
      this.prevImagen = '';
      this.onClose.emit();
   }
}
