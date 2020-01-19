import { Component, ViewChild, OnInit } from '@angular/core';
import { AssetService, AssetMgntData } from './asset.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChangeAssetCategoryComponent } from '../modals/change-asset-category/change-asset-category.component';

@Component({
  templateUrl: './asset-management.component.html',
  providers:[AssetService]
})
export class AssetManagementComponent implements OnInit {

  bsModalRef: BsModalRef;

  error: any;
  public data: AssetMgntData;
  public filterQuery = '';

  constructor(
    private dataTableService: AssetService,
    private modalService: BsModalService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: AssetMgntData) => {
          setTimeout(() => {
            this.data = [...data];
            }, 1000);
        }, // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
  }

  addAsset(){
    this.router.navigateByUrl('/initupload')
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Change Category'
    };
    this.bsModalRef = this.modalService.show(ChangeAssetCategoryComponent, {initialState, class:'modal-info', backdrop:"static"});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
