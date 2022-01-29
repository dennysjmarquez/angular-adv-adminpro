import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { environment } from '@env';

// Services
import { UserService } from './services/user.service';
import { RemoveAllTooltipsFloatService } from '../../../helpers/remove-all-tooltips-float.service';
import { ModalChangeImageService } from '../../../components/modal-change-image/services/modal-change-image.service';

// Components
import Swal from 'sweetalert2';

import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { AuthService } from '../../../services/auth.service';

declare var $;

@Component({
	selector: 'app-users-page',
	templateUrl: './users-page.component.html',
	styles: [],
})
export class UsersPageComponent implements OnInit, OnDestroy {
	@ViewChild('elemSearch') elemSearch;
	@ViewChild('paginationRef') paginationRef: PaginationComponent;

	public records: number = 0;
	public offset: number = 0;
	public limit: number = 0;
	public users: UserModel[] = [];

	public loading: boolean = false;
	public searchValue: string = '';
	public ROLE_ADMIN: string = environment.ROLE_ADMIN;

	public openModalImg: boolean = false;
	public ref_Model_ModalImg: any;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _modalChangeImageService: ModalChangeImageService
	) {}

	get currentUser(): UserModel {
		return this._authService.currentUser;
	}

	get hiddenModal() {
		return this._modalChangeImageService.hiddenModal;
	}

	ngOnInit(): void {
		this.getUsers();

		$('body').tooltip({
			selector: '[data-toggle="tooltip"]',
		});
	}

	ngOnDestroy(): void {
		RemoveAllTooltipsFloatService.remove();
	}

	openImageModal(user: UserModel) {
		this.ref_Model_ModalImg = user;
		this.openModalImg = true;
	}

	/**
	 *
	 * Busca un usuario por su nombre
	 *
	 * @param value {string}
	 */
	search(value?: string) {
		clearTimeout(this.search['wait']);

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
		this.search['wait'] = setTimeout(() => {
			// Muestra el loading
			this.loading = !this.loading;

			this._userService.searchUsers(this.searchValue, this.offset).subscribe(
				({ users, records, limit }: any) => {
					this.users = users;

					this.records = records;
					this.limit = limit;

					// Oculta el loading
					this.loading = !this.loading;
				},
				(error) => {
					console.log(error);
				}
			);
		}, 700);
	}

	/**
	 *
	 * Obtiene todos los usuarios
	 *
	 */
	getUsers() {
		// Muestra el loading
		this.loading = true;

		this._userService.getUsers(this.offset).subscribe(
			({ users, records, limit }: any) => {
				this.users = users;
				this.records = records;
				this.limit = limit;

				// Oculta el loading
				this.loading = false;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	/**
	 *
	 * Borra la búsqueda
	 *
	 */
	clearSearchValue() {
		RemoveAllTooltipsFloatService.remove();
		this.offset = 0;
		this.searchValue = '';
		this.elemSearch.nativeElement.value = '';
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
			confirmButtonText: 'Si, Borrar',
		}).then((result) => {
			if (result.isConfirmed) {
				this._userService.deleteUser(user.uid).subscribe(
					() => {
						Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');

						this.paginationRef.deleteItem(this.users.length);
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
		});
	}

	changeUserRole(user: UserModel) {
		this._userService.updateUser(user).subscribe(
			() => {},
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

	setOffset(offset: number) {
		this.offset = offset;

		this.searchValue ? this.search() : this.getUsers();
	}

	onModalImgChangeClose() {
		this.openModalImg = false;
	}
}
