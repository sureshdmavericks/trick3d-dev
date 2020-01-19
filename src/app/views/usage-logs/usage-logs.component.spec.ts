import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageLogsComponent } from './usage-logs.component';

describe('UsageLogsComponent', () => {
  let component: UsageLogsComponent;
  let fixture: ComponentFixture<UsageLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
