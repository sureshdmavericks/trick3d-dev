import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialUploadComponent } from './initial-upload.component';

describe('InitialUploadComponent', () => {
  let component: InitialUploadComponent;
  let fixture: ComponentFixture<InitialUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
