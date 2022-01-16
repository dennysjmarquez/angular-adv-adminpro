import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RemoveAllTooltipsFloatService {
	static remove() {
		// Borra cualquier Tooltip flotante,
		// por ejemplo el del botón borrar búsqueda
		const tooltips = document.querySelectorAll('.tooltip[role=tooltip]');

		Array.prototype.forEach.call(tooltips, function (node) {
			node.parentNode.removeChild(node);
		});
	}
}
