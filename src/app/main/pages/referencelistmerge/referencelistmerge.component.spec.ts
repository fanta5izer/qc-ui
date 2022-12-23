import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencelistMergeComponent } from './referencelistmerge.component';

describe('ReferencelistMergeComponent', () => {
  let component: ReferencelistMergeComponent;
  let fixture: ComponentFixture<ReferencelistMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencelistMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencelistMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
