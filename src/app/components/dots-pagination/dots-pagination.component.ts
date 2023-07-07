import { Component } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'app-dots-pagination',
  templateUrl: './dots-pagination.component.html',
  styleUrls: ['./dots-pagination.component.scss']
})
export class DotsPaginationComponent extends PaginationComponent {
  isPageButtonShown(page: number) {
    return (
      page === this.currentPage ||
      page === this.currentPage - 1 ||
      page === this.currentPage + 1 ||
      page === 1 ||
      page === this.nbTotalPages
    );
  }

  areFirstPageDotsShown(page: number) {
    const res = page >= 2 && page === this.currentPage - 2;
    return res;
  }

  areLastPageDotsShown(page: number) {
    const res = page <= this.nbTotalPages - 1 && page === this.currentPage + 2;
    return res;
  }
}
