import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AssetService } from "../asset.service"
import _ from "lodash"
import { CategoryService } from "../../category-management/category.service"
import swal from "sweetalert2"

@Component({
  selector: "app-admin-review",
  templateUrl: "./admin-review.component.html",
  styleUrls: ["./admin-review.component.scss"],
  providers: [AssetService, CategoryService]
})
export class AdminReviewComponent implements OnInit {
  simpleForm: FormGroup
  submitted: boolean = false
  features: Array<any> = []
  categories: Array<any> = []

  product_data: any

  constructor(
    public navCtrl: NgxNavigationWithDataComponent,
    private assetService: AssetService,
    private cd: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    if (Object.keys(this.navCtrl.data).length === 0) {
      this.navCtrl.navigate("assets")
      return
    }
    this.product_data = this.navCtrl.data
    this.product_data.NoOfFeatures = Array(this.product_data.NoOfFeatures)
      .fill(this.product_data.NoOfFeatures)
      .map((x, i) => i)
    this.getAssetDetails()
    this.getCategpries(this.product_data.ClientID)
  }

  getCategpries(clientID: string) {
    this._categoryService.getDataByClient(clientID).subscribe(response => {
      this.categories = response.body
    })
  }

  ngOnInit() {
    this.simpleForm = this.fb.group({
      Name: ["", Validators.required],
      CategoryID: [this.product_data.CategoryID, Validators.required],
      Title: ["", Validators.required],
      Description: ["", Validators.required],
      MarkingNumber: [null, Validators.required],
      ProductImage: [""],
      ProductVideo: [""],
      AssetID: [this.product_data.AssetID],
      PictureID: [this.product_data.assetPicture.PictureID],
      MarkingImgURL: [""],
      MarkingVideoURL: [""]
      // MarkingText: [""]
    })
  }

  getAssetDetails() {
    this.assetService.getById(this.product_data.AssetID).subscribe(response => {
      let data: any = response.body
      this.product_data = data
      this.product_data.NoOfFeatures = Array(data.NoOfFeatures)
        .fill(data.NoOfFeatures)
        .map((x, i) => i)
      // for (let index = 0; index < data.assetMarking.length; index++) {
      //   const element = data.assetMarking[index]
      //   if (element.MarkingNumber == index + 1) {
      //     this.features[element.MarkingNumber] = element
      //   }
      // }
    })
  }

  onSelectFeature(event) {
    let featureData = _.find(this.product_data.assetMarking, {MarkingNumber:+event.target.value});
    if (!featureData) {
      this.simpleForm.patchValue({
        Title: "",
        Description: "",
        MarkingImgURL: "",
        MarkingVideoURL:""
      })
      return false
    }
    console.log('featureData:',featureData);
    this.simpleForm.patchValue({
      MarkingNumber: +event.target.value,
      Title: featureData.Title,
      Description: featureData.Description,
      MarkingImgURL: featureData.MarkingImgURL,
      MarkingVideoURL: featureData.MarkingVideoURL
    })
  }

  onSubmitMarking() {
    this.submitted = true
    if (this.simpleForm.invalid) {
      return
    }
    console.log(this.simpleForm.value)
    this.assetService
      .createMarking(this.simpleForm.value, this.product_data.ClientID)
      .subscribe(
        response => {
          this.submitted = false
          console.log(response.body)
          let index = _.findIndex(this.product_data.assetMarking, {MarkingNumber: response.body.MarkingNumber});
          this.product_data.assetMarking[index] = response.body;
          console.log(this.product_data)
        },
        error => {}
      )
  }

  get f() {
    return this.simpleForm.controls
  }

  cancel() {
    this.navCtrl.navigate("/assets")
  }

  onFileChange(event, type: string) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (type == "fei") {
          this.simpleForm.patchValue({
            MarkingImgURL: file
          })
        } else if (type == "fev") {
          this.simpleForm.patchValue({
            MarkingVideoURL: file
          })
        } else if (type == "pi") {
          this.simpleForm.patchValue({
            ProductImage: file
          })
        } else {
          this.simpleForm.patchValue({
            ProductVideo: file
          })
        }
        this.cd.markForCheck()
      }
    }
  }

  showAsset(asset: string, type: string) {
    if (!asset) {
      return
    }
    if (type == "image") {
      swal.fire({
        imageUrl: asset,
        width: 900,
        imageAlt: "Product"
      })
    } else {
      swal.fire({
        html: `
          <iframe width="100%" height="300" src="${asset}" frameborder="0"></iframe>
        `
      })
    }
  }
}
