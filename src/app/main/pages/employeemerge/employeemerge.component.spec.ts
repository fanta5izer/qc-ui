import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMergeComponent } from './employeemerge.component';

describe('EmployeeMergeComponent', () => {
  let component: EmployeeMergeComponent;
  let fixture: ComponentFixture<EmployeeMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
