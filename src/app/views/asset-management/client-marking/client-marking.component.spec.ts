import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarkingComponent } from './client-marking.component';

describe('ClientMarkingComponent', () => {
  let component: ClientMarkingComponent;
  let fixture: ComponentFixture<ClientMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
