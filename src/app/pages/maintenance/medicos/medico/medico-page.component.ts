import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalsService } from '../../hospitals/services/hospitals.service';
import { MedicosService } from '../services/medicos.service';
import { MedicoService } from './services/medico.service';

import { HospitalsModel } from '../../../../models/hospitals.model';
import { MedicosModel } from 'src/app/models/medicos.model';
import {RemoveAllTooltipsFloatService} from '../../../../helpers/remove-all-tooltips-float.service';

@Component({
	selector: 'app-medico',
	templateUrl: './medico-page.component.html',
	styles: [],
})
export class MedicoPageComponent implements OnInit, OnDestroy {
	public medicoForm: FormGroup;
	public loading: boolean = false;
	public hospitals: HospitalsModel[] = [];
	public hospitalSelect: any;
	public medicoSelect: MedicosModel;
	public openModalImg: boolean = false;
	public ref_Model_ModalImg: any;
	private hospitalChangeSubs: Subscription;
	private onEdit: boolean = false;

	constructor(
		private fb: FormBuilder,
		private _hospitalsService: HospitalsService,
		private _medicosService: MedicosService,
		private _medicoService: MedicoService,
		private _router: Router,
		private _activeRouter: ActivatedRoute
	) {}

	ngOnInit(): void {
		const { edit } = this._activeRouter.snapshot.data;

		if (edit) {
			this.onEdit = true;
		}

		this._activeRouter.params.subscribe(({ id }) => this.getMedico(id));

		this.medicoForm = this.fb.group({
			name: ['', Validators.required],
			hospital: ['', Validators.required],
		});

		this.hospitalChangeSubs = this.medicoForm.get('hospital').valueChanges.subscribe((value) => {
			this.hospitalSelect = this.hospitals.find((hospital) => hospital.uid === value);
		});
	}

	getMedico(id: string) {
		this.getHospitals().then(() => {
			if (!id) {
				return;
			}

			this._medicoService.getMedico(id).subscribe(
				(response: any) => {
					const { medico } = response;
					const { name, hospital } = medico;

					this.medicoSelect = medico;
					this.medicoForm.get('hospital').setValue(hospital?._id || null);
					this.medicoForm.get('name').setValue(name);
				},
				() => this._router.navigateByUrl('/404')
			);
		});
	}

	ngOnDestroy(): void {
		this.hospitalChangeSubs.unsubscribe();
	}

	getHospitals() {
		// Muestra el loading
		this.loading = true;

		return new Promise((resolve, reject) => {
			this._hospitalsService.getHospitals(null).subscribe(
				({ hospitals }: any) => {
					this.hospitals = hospitals;
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

	saveMedico() {
		if (this.medicoForm.valid) {
			const { name, hospital } = this.medicoForm.value;

         if (this.onEdit) {
				const { uid } = this.medicoSelect;
				this._medicosService.updateMedico(uid, name, hospital).subscribe(
               (response: any) => {
                  const { medico } = response;
                  Swal.fire('Actualizado !', `El medico ${name} ha sido actualizado .`, 'success');
               },
               (error) => {
                  Swal.fire({
                     title: 'Error!',
                     text: error.error.msg,
                     icon: 'error',
                     confirmButtonText: 'Ok',
                  });
               }
            )
			}

			if (!this.onEdit) {
				this._medicosService.createMedico(this.medicoForm.value).subscribe(
					(response: any) => {
						const { medico } = response;
						Swal.fire('Creado!', `El medico ${name} ha sido creado.`, 'success');
						this._router.navigateByUrl(`/dashboard/doctor/${medico.uid}`);
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
	}

	onModalImgChangeClose() {
		this.openModalImg = false;
	}

	openImageModal() {
		this.ref_Model_ModalImg = this.medicoSelect;
		this.openModalImg = true;
	}
}
