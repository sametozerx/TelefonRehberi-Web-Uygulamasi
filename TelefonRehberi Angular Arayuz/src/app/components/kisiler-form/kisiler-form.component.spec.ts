import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisilerFormComponent } from './kisiler-form.component';

describe('KisilerFormComponent', () => {
  let component: KisilerFormComponent;
  let fixture: ComponentFixture<KisilerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KisilerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KisilerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
