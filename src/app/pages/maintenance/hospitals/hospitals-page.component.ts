import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalsService } from './services/hospitals.service';
import { HospitalsModel } from '../../../models/hospitals.model';
import { UserService } from '../users/services/user.service';
import { ModalChangeImageService } from '../../../components/modal-change-image/services/modal-change-image.service';
import { RemoveAllTooltipsFloatService } from '../../../helpers/remove-all-tooltips-float.service';

import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { environment } from '@env';
import Swal from 'sweetalert2';

declare var $;

@Component({
	selector: 'app-hospitals-page',
	templateUrl: './hospitals-page.component.html',
	styles: [],
})
export class HospitalsPageComponent implements OnInit {
	@ViewChild('elemSearch') elemSearch;
	@ViewChild('paginationRef') paginationRef: PaginationComponent;

	public records: number = 0;
	public offset: number = 0;
	public limit: number = 0;
	public hospitals: HospitalsModel[] = [];
	public createNewHospital = false;
	public searchValue: string = '';
	public ROLE_ADMIN: string = environment.ROLE_ADMIN;

	public loading: boolean = false;

	public openModalImg: boolean = false;
	public ref_Model_ModalImg: any;

	constructor(
		private _hospitalsService: HospitalsService,
		private _userService: UserService,
		private _modalChangeImageService: ModalChangeImageService
	) {}

	get userService() {
		return this._userService;
	}

	ngOnInit(): void {
		this.getHospitals();

		$('body').tooltip({
			selector: '[data-toggle="tooltip"]',
		});
	}

	getHospitals() {
		// Muestra el loading
		this.loading = true;

      return new Promise((resolve, reject) => {

         this._hospitalsService.getHospitals(this.offset).subscribe(
            ({ hospitals, records, limit }: any) => {
               this.hospitals = hospitals;
               this.records = records;
               this.limit = limit;
               resolve();
            },
            (error) => {
               console.log(error);
               reject(error)
            },
            () => {
               // Oculta el loading
               this.loading = false;
            }
         );

      });


	}

	openImageModal(hospital: HospitalsModel) {
		this.ref_Model_ModalImg = hospital;
		this.openModalImg = true;
	}

	/**
	 *
	 * Busca un hospital por su nombre
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

			this._hospitalsService.searchHospitals(this.searchValue, this.offset).subscribe(
				({ hospitals, records, limit }: any) => {
					this.hospitals = hospitals;

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
		this.getHospitals();
	}

	setOffset(offset: number) {
		this.offset = offset;

		this.searchValue ? this.search() : this.getHospitals();
	}

	updateHospital(hospital: HospitalsModel) {
		this._hospitalsService.updateHospital(hospital.uid, hospital.name).subscribe(
			() => {
				Swal.fire({
					title: 'Actualizado',
					text: hospital.name,
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

	deleteHospital(hospital: HospitalsModel) {
		Swal.fire({
			title: '¿Borrar hospital?',
			text: `Está seguro de borrar al hospital: ${hospital.name}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Si, Borrar',
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				this._hospitalsService.deleteHospital(hospital.uid).subscribe(
					() => {
						Swal.fire('Eliminado!', 'El hospital ha sido eliminado.', 'success');
						this.paginationRef.deleteItem(this.hospitals.length);
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

	createHospital() {
		Swal.fire<string>({
			title: 'Crear hospital',
			input: 'text',
			showCancelButton: true,
			inputPlaceholder: 'Escriba el nombre del nuevo hospital aquí',
		}).then(({ isConfirmed, value }) => {
			if (isConfirmed && value.trim().length > 0) {
				this._hospitalsService.createHospital({ name: value.trim(), img: null }).subscribe(
               (response: any) => {
						this.getHospitals().then(() => {
							const hospital = this.hospitals.find((hospital) => hospital.uid === response.hospital.uid)
							this.openImageModal(hospital || response.hospital);
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
		});
	}

	onModalImgChangeClose() {
		this.openModalImg = false;
	}
}
