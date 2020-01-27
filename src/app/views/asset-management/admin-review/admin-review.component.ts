import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AssetService } from "../asset.service"

@Component({
  selector: "app-admin-review",
  templateUrl: "./admin-review.component.html",
  styleUrls: ["./admin-review.component.scss"],
  providers: [AssetService]
})
export class AdminReviewComponent implements OnInit {

  simpleForm: FormGroup
  submitted: boolean = false
  features:Array<any> = [];

  product_data: any

  constructor(
    public navCtrl: NgxNavigationWithDataComponent,
    private assetService: AssetService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    console.log(this.navCtrl.data)
    if (Object.keys(this.navCtrl.data).length === 0) {
      this.navCtrl.navigate("assets")
      return
    }
    this.product_data = this.navCtrl.data
    this.product_data.NoOfFeatures = Array(this.product_data.NoOfFeatures)
      .fill(this.product_data.NoOfFeatures)
      .map((x, i) => i)
    console.log(this.product_data.NoOfFeatures)
    this.getAssetDetails()
  }

  ngOnInit() {
    this.simpleForm = this.fb.group({
      Title: ["", Validators.required],
      Description: ["", Validators.required],
      MarkingNumber: [null, Validators.required],
      AssetID: [this.product_data.AssetID],
      MarkingImgURL: [""],
      MarkingVideoURL: [""],
      MarkingText: [""]
    })
  }

  getAssetDetails() {
    this.assetService.getById(this.product_data.AssetID).subscribe(response => {
      this.product_data = response.body
      this.product_data.NoOfFeatures = Array(this.product_data.NoOfFeatures)
        .fill(this.product_data.NoOfFeatures)
        .map((x, i) => i)
    })
  }

  onSelectFeature(event) {
    console.log(event.target.value)
    this.simpleForm.patchValue({
      MarkingNumber: +event.target.value
    })
  }

  onSubmitMarking() {
    this.submitted = true
    console.log("in Marking Submit")
    console.log(this.simpleForm.value)
    this.assetService.createMarking(this.simpleForm.value, this.product_data.ClientID).subscribe(
      response => {
        this.submitted = false
        console.log("response::", response.body);
        this.features.push(response.body)
      },
      error => {
        // this.submitted = false
      }
    )
  }

  get f() { return this.simpleForm.controls;}

  onFileChange(event) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.simpleForm.patchValue({
          MarkingImgURL: file
        })
        this.cd.markForCheck()
      }
    }
  }
}
