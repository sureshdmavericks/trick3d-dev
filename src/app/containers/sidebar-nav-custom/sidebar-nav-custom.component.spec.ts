import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavCustomComponent } from './sidebar-nav-custom.component';

describe('SidebarNavCustomComponent', () => {
  let component: SidebarNavCustomComponent;
  let fixture: ComponentFixture<SidebarNavCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNavCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
