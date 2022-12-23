import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportreferenceComponent } from './importreference.component';

describe('ImportreferenceComponent', () => {
  let component: ImportreferenceComponent;
  let fixture: ComponentFixture<ImportreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
