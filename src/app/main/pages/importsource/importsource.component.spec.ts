import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  ImportsourceComponent } from './importsource.component';

describe('ImportsourceComponent', () => {
  let component: ImportsourceComponent;
  let fixture: ComponentFixture<ImportsourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportsourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
