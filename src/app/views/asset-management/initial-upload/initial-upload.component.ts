import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AssetService } from "../asset.service"
import { ClientService } from "../../client-management/client.service"
import { CategoryService } from "../../category-management/category.service"
import * as _ from "lodash"
import swal from "sweetalert2"
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data"

@Component({
  templateUrl: "./initial-upload.component.html",
  providers: [AssetService, ClientService, CategoryService]
})
export class InitialUploadComponent implements OnInit {
  simpleForm: FormGroup
  submitted = false
  formErrors: any
  clients: any
  categories: any
  product_data: any

  constructor(
    private fb: FormBuilder,
    private _dataService: AssetService,
    private _clientService: ClientService,
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
    this.product_data = this.navCtrl.data
    this.createForm()
    if (Object.keys(this.navCtrl.data).length > 0) {
      this.simpleForm.patchValue({
        ClientID: this.product_data.ClientID,
        CategoryID:this.product_data.CategoryID,
        Name: this.product_data.Name,
        Upload: this.product_data.Upload,
        NoOfFeatures: this.product_data.NoOfFeatures
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
    })
  }

  getCategpries() {
    this._categoryService.getData().subscribe(response => {
      this.categories = response.body;
      if (this.product_data) {
        this.simpleForm.patchValue({
          CategoryID: this.product_data.CategoryID
        })
      }
    })
  }

  ngOnInit() {
    this.getClients()
  }

  createForm() {
    this.simpleForm = this.fb.group({
      ClientID: ["", [Validators.required]],
      CategoryID: ["", [Validators.required]],
      sub_category: [""],
      Name: ["", [Validators.required]],
      Upload: [null, [Validators.required]],
      NoOfFeatures: [null, [Validators.required]]
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

    this._dataService
      .create(_.omit(this.simpleForm.value, ["sub_category"]))
      .subscribe(
        response => {
          swal.fire("Success", "Product added.", "success").then(result => {
            this._router.navigateByUrl("assets")
          })
        },
        error => {
          swal.fire("Oops!", "Something went wrong.", "error")
        }
      )
  }

  onFileChange(event) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.simpleForm.patchValue({
          Upload: file
        })
        this.cd.markForCheck()
      }
    }
  }
}
