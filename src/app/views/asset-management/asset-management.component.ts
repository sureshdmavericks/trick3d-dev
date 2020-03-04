import { Component, ViewChild, OnInit } from "@angular/core"
import { AssetService, AssetMgntData } from "./asset.service"
import { Router } from "@angular/router"
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal"
import { ChangeAssetCategoryComponent } from "../modals/change-asset-category/change-asset-category.component";
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import * as _ from 'lodash';
import { AuthService } from '../../authentication/auth.service';
import swal from 'sweetalert2';

@Component({
  templateUrl: "./asset-management.component.html",
  providers: [AssetService]
})
export class AssetManagementComponent implements OnInit {
  bsModalRef: BsModalRef

  error: any
  public data: any;
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
        this.data = [...data.body]
      },
      error => {
        console.log(error.error.error.code)
        if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
          console.log('in token error');
          this._authService.logout();
          // window.location.href = '/login';
        }else{
          this.error = error
        }
      }
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
    this.navCtrl.navigate("initupload")
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

  unpublishProduct(id:string, Status:string, i:number) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Product will be ${Status}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      })
      .then(result => {
        if (result.value) {
          this.dataTableService
            .update({ Status }, id)
            .subscribe(
              response => {
                this.data[i] = response.body;
                swal.fire('Success',`Product ${Status}.`);
              },
              error => {
                if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
                  console.log('in token error');
                  this._authService.logout();
                }else{
                  swal.fire("Oops!", `Something went wrong.`, "error");
                }
              }
            )
        } 
      })
  }


  

}
