import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMergeComponent } from './customermerge.component';

describe('EmployeeMergeComponent', () => {
  let component: CustomerMergeComponent;
  let fixture: ComponentFixture<CustomerMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
