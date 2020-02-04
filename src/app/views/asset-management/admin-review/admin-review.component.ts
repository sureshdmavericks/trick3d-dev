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
  isHaving: any = {
    pi: false,
    pv: false,
    mi: false,
    mv: false
  }

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
    })
  }

  onSelectFeature(event) {
    let featureData = _.find(this.product_data.assetMarking, {
      MarkingNumber: +event.target.value
    })
    if (!featureData) {
      this.simpleForm.patchValue({
        Title: "",
        Description: "",
        MarkingImgURL: "",
        MarkingVideoURL: ""
      })
      return false
    }
    console.log("featureData:", featureData)
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
    this.assetService
      .createMarking(this.simpleForm.value, this.product_data.ClientID)
      .subscribe(
        response => {
          this.submitted = false
          let index = _.findIndex(this.product_data.assetMarking, {
            MarkingNumber: response.body.MarkingNumber
          })
          if (index >= 0) this.product_data.assetMarking[index] = response.body
          else this.product_data.assetMarking.push(response.body)
          swal.fire("Success", `Product updated successfully.`, "success")
        },
        error => {
          swal.fire("Oops!", `Something went wrong.`, "error")
        }
      )
  }

  publishProduct() {
    swal
      .fire({
        title: "Are you sure?",
        text: `Product will be published.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      })
      .then(result => {
        if (result.value) {
          this.assetService
            .update({ Status: "reviewed" }, this.product_data.AssetID)
            .subscribe(
              response => {
                console.log(response)
                swal.fire('Success','Product published successfully.');
              },
              error => {
                swal.fire("Oops!", `Something went wrong.`, "error");
              }
            )
        } 
      })
  }

  get f() {
    return this.simpleForm.controls
  }

  cancel() {
    this.navCtrl.navigate("/assets")
  }

  toggleAssets(flag, element) {
    console.log("this.isHaving::", this.isHaving)
    this.isHaving[element] = flag
    console.log("this.isHaving n::", this.isHaving)
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
