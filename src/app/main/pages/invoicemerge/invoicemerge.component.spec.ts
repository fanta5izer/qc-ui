import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceComponent } from '../Invoice/invoice.component';

import {  } from './invoicemerge.component';

describe('EmployeeMergeComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
