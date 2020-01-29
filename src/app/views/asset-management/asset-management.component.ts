import { Component, ViewChild, OnInit } from "@angular/core"
import { AssetService, AssetMgntData } from "./asset.service"
import { Router } from "@angular/router"
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal"
import { ChangeAssetCategoryComponent } from "../modals/change-asset-category/change-asset-category.component";
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import * as _ from 'lodash';
import { AuthService } from '../../authentication/auth.service';

@Component({
  templateUrl: "./asset-management.component.html",
  providers: [AssetService]
})
export class AssetManagementComponent implements OnInit {
  bsModalRef: BsModalRef

  error: any
  public data: AssetMgntData
  // public filterQuery = ""
  isAdmin:boolean;

  constructor(
    private dataTableService: AssetService,
    private modalService: BsModalService,
    private _authService: AuthService,
    public navCtrl: NgxNavigationWithDataComponent,
    private router: Router
  ) {
    this.dataTableService.getData().subscribe(
      (data: any) => {
        console.log
        this.data = [...data.body]
      },
      error => (this.error = error)
    )
  }

  openReview(item:any){
    console.log(item)
    if(item){
      if(!this.isAdmin)
        this.navCtrl.navigate('product-review', _.omit(item,['category']));
      else
      {
        this.navCtrl.navigate('initupload', _.omit(item,['category']));
      }
    }
  }

  ngOnInit() {
    console.log(this._authService.getData())
    this.isAdmin = (this._authService.getData()).role==1?true:false;
  }

  addAsset() {
    this.router.navigateByUrl("/initupload")
  }

  public toInt(num: string) {
    return +num
  }

  public sortByWordLength = (a: any) => {
    return a.name.length
  }

  public getDate(regDate: string) {
    const date = new Date(regDate)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    })
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        "Open a modal with component",
        "Pass your data",
        "Do something else",
        "..."
      ],
      title: "Change Category"
    }
    this.bsModalRef = this.modalService.show(ChangeAssetCategoryComponent, {
      initialState,
      class: "modal-info",
      backdrop: "static"
    })
    this.bsModalRef.content.closeBtnName = "Close"
  }
}
