interface User {
	_id: string;
	name: string;
	img: string;
}

export class HospitalsModel {
	constructor(public name: string, public img?: string, public user?: User, public uid?: string) {}
}
