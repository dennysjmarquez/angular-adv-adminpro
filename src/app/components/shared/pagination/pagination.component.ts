import {Component, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
   selector: 'app-pagination',
   templateUrl: './pagination.component.html',
   styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

   @Input() itemPerPage: number = 0;

   @Input() next: boolean = true;
   @Input() previous: boolean = true;
   @Input() firstPage: boolean = true;
   @Input() lastPage: boolean = true;


   // Determina el total de Records de una colección,
   // para determinar el número de página según el número de ítems por pagina
   @Input() total: number = 0;

   @Output() setOffset = new EventEmitter<number>();

   totalItems: number[] = [];
   onChanges: boolean = false;
   forceCurrentPage: boolean = false;

   pager: {
      totalPages?: number,
      startIndex?: number,
      endIndex?: number,
      currentPage?: number,
      startPage?: number,
      endPage?: number,
      pages?: number[]
   } = {};

   constructor() {
   }

   ngOnChanges(changes: SimpleChanges): void {

      this.onChanges = true;

      const currentPage = this.forceCurrentPage ? this.pager.currentPage : 1;
      this.forceCurrentPage = false;

      this.totalItems.length = this.total;
      this.pager = {};

      this.setPage(currentPage);


   }

   /**
    *
    * Método para cuando se elimina un item de la pagina actual, esto hace
    * que se recargue la paginación y se conserve la página actual o se valla
    * a la siguiente en caso que sea un último item de una pagina y se Invoca
    * a setOffset
    *
    *
    * Este método debe se ser accedido mediante una referencia a componente
    * Ejemplo:
    *
    * import {PaginationComponent} from 'pagination.component';
    *
    * _ @ViewChild('paginationRef') paginationRef: PaginationComponent;
    *
    * Uso:
    *
    * Array de items
    * this.users.length
    *
    * this.paginationRef.deleteItem(this.users.length);
    *
    * @param currentItems {number} Determinan los ítems de la página actual
    */
   deleteItem(currentItems: number) {

      this.forceCurrentPage = true;

      this.setPage(currentItems === 1
         ? this.pager.currentPage - 1
         : this.pager.currentPage);

   }

   clicPaginate(page: number) {

      this.forceCurrentPage = false;

      if (this.pager.currentPage === page || page <= 0) {
         return;
      }

      this.setPage(page);

   }

   setPage(currentPage: number) {

      currentPage <= 0 && (currentPage = 1);

      if (this.pager && (currentPage > this.pager.totalPages)) {
         return;
      }

      this.setPager(this.totalItems.length, currentPage);

      this.onChanges
         ? (this.onChanges = false)
         : this.setOffset.emit(this.pager.startIndex);

   }


   setPager(itemCount: number, currentPage: number) {

      const maxLink = 5;

      currentPage = currentPage || 1;

      let startPage, endPage;
      const totalPages = Math.ceil(itemCount / this.itemPerPage);

      if (currentPage > totalPages) {
         currentPage = totalPages;
      }

      if (currentPage + 1 >= totalPages) {

         startPage = Math.max(totalPages - (maxLink - 1), 1);
         endPage = totalPages;

      } else {

         startPage = Math.max(currentPage - Math.floor(maxLink / 2), 1);
         endPage = (startPage + maxLink - 1) <= totalPages ? (startPage + maxLink - 1) : totalPages;

         if (totalPages === endPage) {

            startPage = Math.max(endPage - maxLink + 1, 1);

         }
      }

      const startIndex = (currentPage - 1) * this.itemPerPage;
      const endIndex = startIndex + this.itemPerPage - 1;

      let index = startPage;
      const pages = [];

      for (; index < endPage + 1; index++) {
         pages.push(index);
      }

      this.pager.currentPage = currentPage;
      this.pager.totalPages = totalPages;
      this.pager.startPage = startPage;
      this.pager.endPage = endPage;
      this.pager.startIndex = startIndex;
      this.pager.endIndex = endIndex;
      this.pager.pages = pages;

   }

}

