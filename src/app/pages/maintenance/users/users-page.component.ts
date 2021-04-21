import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../../models/user.model';
import {environment} from '@env';

// Services
import {UserService} from '../../../services/user.service';
import {ModalChangeImageService} from '../../../components/modal-change-image/services/modal-change-image.service';

// Components
import {PaginationComponent} from '../../../components/shared/pagination/pagination.component';


import Swal from 'sweetalert2';

declare var $;

@Component({
   selector: 'app-users-page',
   templateUrl: './users-page.component.html',
   styles: []
})
export class UsersPageComponent implements OnInit, OnDestroy {


   @ViewChild('elemSearchUsers') elemSearchUsers;
   @ViewChild('paginationRef') paginationRef: PaginationComponent;

   public useRecords: number = 0;
   public offset: number = 0;
   public limit: number = 0;
   public users: UserModel[] = [];

   public loading: boolean = false;
   public searchValue: string = '';
   public ROLE_ADMIN: string = environment.ROLE_ADMIN;


   constructor(
      private _userService: UserService,
      private _modalChangeImageService: ModalChangeImageService
   ) {
   }

   ngOnInit(): void {

      this.getUsers();

      $('body').tooltip({
         selector: '[data-toggle="tooltip"]'
      });

   }

   ngOnDestroy(): void {

      this.fixRemoveAllTooltipsFloat();

   }

   get userService() {
      return this._userService;
   }

   openImageModal(user: UserModel) {

      this._modalChangeImageService.openModal('users', user.uid, user);

   }


   /**
    *
    * Busca un usuario por su nombre
    *
    * @param value {string}
    */
   searchUsers(value?: string) {

      clearTimeout(this.searchUsers['wait']);

      if (value) {

         this.offset = 0;

         // Se almacena el valor de la Query para la paginación
         this.searchValue = value;

      }

      // Si la búsqueda está vacía se retornan todos los usuarios
      if (typeof value === 'string' && value.length === 0) {

         this.clearSearchValue();
         return;

      }

      // Dalay para esperar la última palabra, para ahorrar estar mandando
      // letra por letra mientras se escribe en la caja de texto
      this.searchUsers['wait'] = setTimeout(() => {

         // Muestra el loading
         this.loading = !this.loading;

         this._userService.searchUsers(this.searchValue, this.offset).subscribe(({users, records, limit}: any) => {

            this.users = users;

            this.useRecords = records;
            this.limit = limit;

            // Oculta el loading
            this.loading = !this.loading;

         }, error => {
            console.log(error);
         });

      }, 700);


   }


   /**
    *
    * Obtiene todos los usuarios
    *
    */
   getUsers() {

      // Muestra el loading
      this.loading = !this.loading;

      this._userService.getUsers(this.offset).subscribe(({users, records, limit}: any) => {

         this.users = users;
         this.useRecords = records;
         this.limit = limit;

         // Oculta el loading
         this.loading = !this.loading;

      }, error => {
         console.log(error);
      });

   }

   fixRemoveAllTooltipsFloat() {

      // Borra cualquier Tooltip flotante,
      // por ejemplo el del botón borrar búsqueda
      const tooltips = document.querySelectorAll('.tooltip[role=tooltip]');

      Array.prototype.forEach.call(tooltips, function(node) {

         node.parentNode.removeChild(node);
      });

   }

   /**
    *
    * Borra la búsqueda
    *
    */
   clearSearchValue() {

      this.fixRemoveAllTooltipsFloat();
      this.offset = 0;
      this.searchValue = '';
      this.elemSearchUsers.nativeElement.value = '';
      this.getUsers();

   }

   deleteUser(user: UserModel) {

      Swal.fire({
         title: '¿Borrar al usuario?',
         text: `Está seguro de borrar al usuario: ${user.name}`,
         icon: 'question',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Borrar'
      }).then((result) => {

         if (result.isConfirmed) {

            this._userService.deleteUser(user.uid).subscribe(() => {

               Swal.fire(
                  'Eliminado!',
                  'El usuario ha sido eliminado.',
                  'success'
               );

               this.paginationRef.deleteItem(this.users.length);

            }, error => {

               Swal.fire({
                  title: 'Error!',
                  text: error.error.msg,
                  icon: 'error',
                  confirmButtonText: 'Ok'
               });

            });

         }

      });
   }

   changeUserRole(user: UserModel) {

      this._userService.updateUser(user).subscribe(() => {
      }, error => {

         Swal.fire({
            title: 'Error!',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
         });

      });


   }


   setOffset(offset: number) {

      this.offset = offset;

      this.searchValue
         ? this.searchUsers()
         : this.getUsers();

   }

}
