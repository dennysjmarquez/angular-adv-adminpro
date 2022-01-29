import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MedicosService } from './services/medicos.service';
import { ModalChangeImageService } from '../../../components/modal-change-image/services/modal-change-image.service';
import { MedicosModel } from '../../../models/medicos.model';
import { environment } from '@env';
import { RemoveAllTooltipsFloatService } from '../../../helpers/remove-all-tooltips-float.service';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import Swal from 'sweetalert2';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

declare var $;

@Component({
	selector: 'app-medicos-page',
	templateUrl: './medicos-page.component.html',
	styles: [],
})
export class MedicosPageComponent implements OnInit, OnDestroy {
	@ViewChild('elemSearch') elemSearch;
	@ViewChild('paginationRef') paginationRef: PaginationComponent;

	public records: number = 0;
	public offset: number = 0;
	public limit: number = 0;
	public medicos: MedicosModel[] = [];
	public searchValue: string = '';
	public ROLE_ADMIN: string = environment.ROLE_ADMIN;

	public loading: boolean = false;

	public openModalImg: boolean = false;
	public ref_Model_ModalImg: any;

	constructor(
		private _medicosService: MedicosService,
		private _authService: AuthService,
		private _modalChangeImageService: ModalChangeImageService
	) {}

	get currentUser(): UserModel {
		return this._authService.currentUser;
	}

	ngOnInit(): void {
		this.getMedicos();

		$('body').tooltip({
			selector: '[data-toggle="tooltip"]',
		});
	}

	getMedicos() {
		// Muestra el loading
		this.loading = true;

		return new Promise((resolve, reject) => {
			this._medicosService.getMedicos(this.offset).subscribe(
				({ medicos, records, limit }: any) => {
					this.medicos = medicos;
					this.records = records;
					this.limit = limit;
					resolve();
				},
				(error) => {
					console.log(error);
					reject(error);
				},
				() => {
					// Oculta el loading
					this.loading = false;
				}
			);
		});
	}

	/**
	 *
	 * Busca un medico por su nombre
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

		// Si la búsqueda está vacía se retornan todos los hospitales
		if (typeof value === 'string' && value.length === 0) {
			this.clearSearchValue();
			return;
		}

		// Dalay para esperar la última palabra, para ahorrar estar mandando
		// letra por letra mientras se escribe en la caja de texto
		this.search['wait'] = setTimeout(() => {
			// Muestra el loading
			this.loading = !this.loading;

			this._medicosService.searchMedicos(this.searchValue, this.offset).subscribe(
				({ medicos, records, limit }: any) => {
					this.medicos = medicos;

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
	 * Borra la búsqueda
	 *
	 */
	clearSearchValue() {
		RemoveAllTooltipsFloatService.remove();
		this.offset = 0;
		this.searchValue = '';
		this.elemSearch.nativeElement.value = '';
		this.getMedicos();
	}

	setOffset(offset: number) {
		this.offset = offset;

		this.searchValue ? this.search() : this.getMedicos();
	}

	onModalImgChangeClose() {
		this.openModalImg = false;
	}

	openImageModal(medico: MedicosModel) {
		if (this.currentUser.role !== this.ROLE_ADMIN) {
			return;
		}

		this.ref_Model_ModalImg = medico;
		this.openModalImg = true;
	}

	deleteMedico(medico: MedicosModel) {
		Swal.fire({
			title: '¿Borrar medico?',
			text: `Está seguro de borrar al medico: ${medico.name}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Si, Borrar',
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				this._medicosService.deleteMedico(medico.uid).subscribe(
					() => {
						Swal.fire('Eliminado!', 'El medico ha sido eliminado.', 'success');
						this.paginationRef.deleteItem(this.medicos.length);
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

	ngOnDestroy(): void {
		RemoveAllTooltipsFloatService.remove();
	}
}
