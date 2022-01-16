import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../maintenance/users/services/user.service';
import {FileUploadService} from '../../services/file-upload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ModalChangeImageService} from '../../components/modal-change-image/services/modal-change-image.service';

@Component({
   selector: 'app-profile-page',
   templateUrl: './profile-page.component.html',
   styles: [
      `
         .img-fluid {
            max-height: 300px;
         }
      `,
   ],
})
export class ProfilePageComponent implements OnInit {
   private formSubmitted = false;

   user: UserModel = this._userService.user;

   @ViewChild('avatarFile') avatarFile;

   profileForm: FormGroup = this._formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
   });

   previImagenUser: string = this._userService.user.getImagen;
   imagenUserUpLoad: File;

   constructor(
      private _userService: UserService,
      private _formBuilder: FormBuilder,
      private _fileUploadService: FileUploadService,
      private _modalChangeImageService: ModalChangeImageService
   ) {
   }

   ngOnInit(): void {
   }

   fieldNotValid(field: string, error: string): Boolean {
      return this.formSubmitted && this.profileForm.get(field).getError(error);
   }

   handleFileInput(file: File) {
      if (!file) {
         this.previImagenUser = this._userService.user.getImagen;
         this.imagenUserUpLoad = null;
         return;
      }

      const reader = new FileReader();

      this.imagenUserUpLoad = file;
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
         this.previImagenUser = event.target.result;
      };
   }

   clickFile() {
      const fileUpload = this.avatarFile.nativeElement;

      fileUpload.onchange = () => this.imagenUserUpLoad && this.onUpFile();

      this.avatarFile.nativeElement.click();
   }

   onUpFile() {
      this._fileUploadService
         .upLoad(this.imagenUserUpLoad, 'users', this.user.uid)

         .subscribe(
            ({nameFile}) => {
               this.user.img = nameFile;

               Swal.fire({
                  title: 'Atención!',
                  text: 'Su imagen fue actualizada, con éxito ',
                  icon: 'success',
                  confirmButtonText: 'Ok',
               });

               this.avatarFile.nativeElement.value = null;
               this.imagenUserUpLoad = null;
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

   onSubmit() {
      this.formSubmitted = true;

      if (this.profileForm.invalid) {
         return;
      }

      this._userService.updateUserProfile(this.profileForm.value).subscribe(
         () => {
            // Se actualiza los datos del usuario con la nueva información, en JavaScript todoo
            // es por referencia por eso se cambia los datos en las plantillas donde se haga referencia a UserModel,
            // en caso que no fuera así se podría usar Reduux o Rxjs
            const {email, name} = this.profileForm.value;

            this.user.email = email;
            this.user.name = name;

            Swal.fire({
               title: 'Atención!',
               text: 'Sus datos fueron actualizados, con éxito ',
               icon: 'success',
               confirmButtonText: 'Ok',
            });
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
}
