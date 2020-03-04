import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AssetService } from "../asset.service"
import { ClientService } from "../../client-management/client.service"
import { CategoryService } from "../../category-management/category.service"
import * as _ from "lodash"
import swal from "sweetalert2"
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data"
import { AuthService } from '../../../authentication/auth.service'

@Component({
  templateUrl: "./initial-upload.component.html",
  providers: [AssetService, ClientService, CategoryService, AuthService]
})
export class InitialUploadComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  clients: any;
  categories: any;
  product_data: any;
  preview: string;
  pzip:string;
  pzipName:string;
  fileName:string;

  constructor(
    private fb: FormBuilder,
    private _dataService: AssetService,
    private _clientService: ClientService,
    private _authService:AuthService,
    private _categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    public navCtrl: NgxNavigationWithDataComponent,
    private _router: Router
  ) {
    // if (Object.keys(this.navCtrl.data).length === 0) {
    //   this.navCtrl.navigate("assets");
    //   return;
    // }
    console.log('navCtrl.data::',this.navCtrl.data);
    this.product_data = this.navCtrl.data;
    this.createForm();
    if (Object.keys(this.navCtrl.data).length > 0) {
      this.simpleForm.patchValue({
        AssetID:this.product_data.AssetID,
        ClientID: this.product_data.ClientID,
        CategoryID:this.product_data.CategoryID,
        Name: this.product_data.Name,
        Upload: this.product_data.Upload,
        AssetBundle:this.product_data.AssetBundle,
        NoOfFeatures: this.product_data.NoOfFeatures,
        UploadCount:this.product_data.UploadCount
      })
    }
    this.getCategpries();

  }

  openImagePopup(){
    swal.fire({
      // title: '',
      width: 600,
      text: this.product_data.Name,
      imageUrl: this.product_data.Upload,
      imageWidth: 600,
      showCloseButton: true,
      showConfirmButton: false,
      focusCancel: false,
      imageAlt: `${this.product_data.Name} Thumbnail`,
    })
  }

  private getClients() {
    this._clientService.getData().subscribe(response => {
      this.clients = _.map(response.body, x => {
        if (x.Status) {
          return x
        }
      })
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire("Oops!", `Something went wrong.`, "error");
      }
    })
  }

  getCategpries() {
    this._categoryService.getData().subscribe(response => {
      this.categories = response.body;
      if (Object.keys(this.product_data).length > 0) {
        this.simpleForm.patchValue({
          CategoryID: this.product_data.CategoryID
        })
      }

    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire("Oops!", `Something went wrong.`, "error");
      }
    })
  }

  ngOnInit() {
    this.getClients()
  }

  createForm() {
    this.simpleForm = this.fb.group({
      AssetID:[""],
      ClientID: ["", [Validators.required]],
      CategoryID: ["", [Validators.required]],
      AssetBundle:[null,[Validators.required]],
      sub_category: [""],
      Name: ["", [Validators.required]],
      Upload: [null, [Validators.required]],
      NoOfFeatures: [null, [Validators.required]],
      UploadCount:[null, [Validators.required]]
    })
  }

  get f() {
    return this.simpleForm.controls
  }

  onReset() {
    this.submitted = false
    this.simpleForm.reset()
  }

  cancel() {
    this._router.navigateByUrl("assets")
  }

  onSubmit() {
    this.submitted = true
    if (this.simpleForm.invalid) {
      return
    }
    console.log("Form Data:",this.simpleForm.value);
    // return;
    this._dataService
      .create(_.omit(this.simpleForm.value, ["sub_category"]))
      .subscribe(
        response => {
          swal.fire("Success", "Product added.", "success").then(result => {
            this._router.navigateByUrl("assets")
          })
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

  onFileChange(event, type:string) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {

        if (type == "fim") {
          this.preview = reader.result as string;
          this.fileName = 'File Choosen';
          this.simpleForm.patchValue({
            Upload: file
          })
        } else {
          this.pzip = file.name
          this.pzipName = 'File Choosen'
          this.simpleForm.patchValue({
            AssetBundle: file
          })
        }

        this.cd.markForCheck()
      }
    }
  }
}
