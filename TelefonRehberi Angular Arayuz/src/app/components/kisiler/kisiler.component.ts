import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { KisilerService } from '../../shared/kisiler.service';
import { Kisiler } from '../../shared/kisiler.model';
import { KisilerFormComponent } from '../kisiler-form/kisiler-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kisiler',
  templateUrl: './kisiler.component.html',
  styleUrls: ['./kisiler.component.css']
})
export class KisilerComponent implements OnInit {
  @ViewChild(KisilerFormComponent) kisilerForm: KisilerFormComponent;
  @ViewChild('searchInput') searchInput!: ElementRef;
  filteredKisiler: Kisiler[] = [];
  searchQuery: string = '';
  sortColumn: keyof Kisiler | '' = '';
  sortDirection: string = 'asc';
  

  constructor(
    public kisilerService: KisilerService,
    public toast: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.kisilerService.getKisiler().subscribe(data => {
      this.kisilerService.listKisiler = data;
      this.filteredKisiler = data;
    });
  }
  
  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredKisiler = this.kisilerService.listKisiler.filter(kisi =>
      `${kisi.isim} ${kisi.soyisim}`.toLowerCase().includes(this.searchQuery) ||
      kisi.numara.toLowerCase().includes(this.searchQuery) ||
      kisi.email.toLowerCase().includes(this.searchQuery)
    );
  }

  populateKisi(selectedKisi: Kisiler) {
    this.kisilerService.kisilerData = { ...selectedKisi };
    if (this.kisilerForm.isSlide === false) {
      this.kisilerForm.hideShowSlide();
    }
    this.resetSearch();
  }

  deleteKisi(id: number) {
    const confirmMessage = this.translate.instant('APP.CONFIRM_DELETE');
    if (confirm(confirmMessage)) {
      this.toast.success(this.translate.instant('APP.SUCCESS_OPERATION'), this.translate.instant('APP.PERSON_DELETED'));
      this.kisilerService.deleteKisi(id).subscribe(() => {
        this.kisilerService.getKisiler().subscribe(data => {
          this.kisilerService.listKisiler = data;
          this.filteredKisiler = data;
        });
      });
    }
  }

  get isFormSlide() {
    return this.kisilerForm.isSlide;
  }

  resetSearch() {
    this.searchQuery = '';
    this.filteredKisiler = this.kisilerService.listKisiler;
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }

  sortData(column: keyof Kisiler) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;
    this.filteredKisiler.sort((a, b) => {
      const valA = a[column] ? a[column].toString().toLowerCase() : '';
      const valB = b[column] ? b[column].toString().toLowerCase() : '';
      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(column: keyof Kisiler) {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }
    return '';
  }

  resetSort() {
    this.sortColumn = '';
    this.sortDirection = 'asc';
  }
}
