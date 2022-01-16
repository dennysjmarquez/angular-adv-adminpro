import {HospitalsModel} from './hospitals.model';

interface User {
	_id: string;
	name: string;
	img: string;
}

export class MedicosModel {
	constructor(
		public name: string,
		public img?: string,
		public uid?: string,
		public hospital?: HospitalsModel,
		public user?: User
	) {}
}
