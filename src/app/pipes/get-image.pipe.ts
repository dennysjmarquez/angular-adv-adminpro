import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env';

const baseUrl = environment.baseUrl;

@Pipe({
	name: 'getImage',
})
export class GetImagePipe implements PipeTransform {
	transform(value: any, type: 'users' | 'medicos' | 'hospitals'): any {
		return value && value.includes('://') ? value : `${baseUrl}/upload/${type}/${value || 'no-imagen'}`;
	}
}
