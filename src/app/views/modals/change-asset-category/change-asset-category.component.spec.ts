import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAssetCategoryComponent } from './change-asset-category.component';

describe('ChangeAssetCategoryComponent', () => {
  let component: ChangeAssetCategoryComponent;
  let fixture: ComponentFixture<ChangeAssetCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAssetCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAssetCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
