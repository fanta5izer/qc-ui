import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceListComponent } from './sourcelist.component';

describe('EmployeeComponent', () => {
  let component: SourceListComponent;
  let fixture: ComponentFixture<SourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
