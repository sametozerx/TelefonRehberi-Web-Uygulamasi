import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KisilerService } from 'src/app/shared/kisiler.service';
import { Kisiler } from 'src/app/shared/kisiler.model';
import { KisilerComponent } from '../kisiler/kisiler.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kisiler-form',
  templateUrl: './kisiler-form.component.html',
  styleUrls: ['./kisiler-form.component.css']
})
export class KisilerFormComponent implements OnInit, AfterViewInit {
  @ViewChild('checkbox1') checkBox!: ElementRef;
  isSlide: boolean = false;

  constructor(
    public kisilerService: KisilerService,
    public toast: ToastrService,
    private kisilerComponent: KisilerComponent,
    private translate: TranslateService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.checkBox.nativeElement.addEventListener('change', () => {
      this.isSlide = this.checkBox.nativeElement.checked;
    });
  }

  submit(form: NgForm) {
    if (this.kisilerService.kisilerData.id === 0) {
      this.insertKisi(form);
    } else {
      this.updateKisi(form);
    }
  }

  insertKisi(myform: NgForm) {
    this.kisilerService.addKisi().subscribe(() => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.success(this.translate.instant('APP.SUCCESS_OPERATION'), this.translate.instant('APP.PERSON_ADDED'));
      this.kisilerComponent.resetSort();
    });
  }

  updateKisi(myform: NgForm) {
    this.kisilerService.updateKisi().subscribe(() => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.success(this.translate.instant('APP.SUCCESS_OPERATION'), this.translate.instant('APP.PERSON_UPDATED'));
      this.kisilerComponent.resetSort();
    });
  }

  resetForm(myform: NgForm) {
    myform.resetForm();
    this.kisilerService.kisilerData = new Kisiler();
    this.hideShowSlide();
    this.kisilerComponent.resetSearch();
  }

  refreshData() {
    this.kisilerService.getKisiler().subscribe(res => {
      this.kisilerService.listKisiler = res;
      this.kisilerComponent.filteredKisiler = res;
    });
  }

  hideShowSlide() {
    if (this.checkBox.nativeElement.checked) {
      this.checkBox.nativeElement.checked = false;
      this.isSlide = false;
    } else {
      this.checkBox.nativeElement.checked = true;
      this.isSlide = true;
    }
  }

  private isToastVisible: boolean = false; 
  private toastTimeout: any;
  
  validateNumberInput(event: KeyboardEvent) {
      const allowedChars = /[0-9 _\-+()]/;
      const inputChar = event.key;
  
      if (!allowedChars.test(inputChar) && inputChar !== 'Backspace' && inputChar !== 'Delete') {
          event.preventDefault();
          
          if (this.isToastVisible) {
              if (this.toastTimeout) {
                  clearTimeout(this.toastTimeout);
              }
              this.toastTimeout = setTimeout(() => {
                  this.isToastVisible = false;
              }, 3000); 
          } else {
            
              this.toast.error(this.translate.instant('APP.INVALID_CHARACTER'));
              this.isToastVisible = true;
  
              
              this.toastTimeout = setTimeout(() => {
                  this.isToastVisible = false;
              }, 3000); 
          }
      }
  }
  
}
