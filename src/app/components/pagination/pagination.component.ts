import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  private _nbTotalElements = 0;
  @Input()
  public get nbTotalElements() {
    return this._nbTotalElements;
  }
  public set nbTotalElements(value) {
    this._nbTotalElements = value;
    this.calculatePages();
  }

  @Input() nbElementsPerPage = 0;
  @Input() currentPage = 0;

  @Output() onPageChange = new EventEmitter<number>();

  nbTotalPages = 0;

  pages?: number[];

  private calculatePages() {
    if (this.nbTotalElements === 0) return;
    this.nbTotalPages = Math.ceil(this.nbTotalElements / this.nbElementsPerPage);
    const tempArray = Array(this.nbTotalPages);
    this.pages = Array.from(tempArray, x => 1);
  }

  goToPage(page: number) {
    this.onPageChange.emit(page);
  }
}
