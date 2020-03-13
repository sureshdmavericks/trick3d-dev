import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from "@angular/core"
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AssetService } from "../asset.service"
import _ from "lodash"
import { CategoryService } from "../../category-management/category.service"
import swal from "sweetalert2"
import { Router } from "@angular/router"
import { AuthService } from '../../../authentication/auth.service'

@Component({
  selector: "app-admin-review",
  templateUrl: "./admin-review.component.html",
  styleUrls: ["./admin-review.component.scss"],
  providers: [AssetService, CategoryService, AuthService]
})
export class AdminReviewComponent implements OnInit {
  simpleForm: FormGroup
  submitted: boolean = false
  features: Array<any> = []
  categories: Array<any> = []
  videoURL: boolean = true

  @ViewChild("mv", { static: false }) mv: ElementRef
  @ViewChild("mi", { static: false }) mi: ElementRef
  @ViewChild("pv", { static: false }) pv: ElementRef
  @ViewChild("pi", { static: false }) pi: ElementRef

  product_data: any
  isHaving: any = {
    pi: false,
    pv: false,
    mi: false,
    mv: false
  }
  feiPreview: Array<any> = [];
  feiName: string
  pvPreview: Array<any> = [];
  pvName: string
  fevPreview: Array<any> = [];
  fevName: string
  piPreview: Array<any> = [];
  piName: string;

  pImages = [];
  pVideos = [];
  iImages = [];
  iVideos = [];

  constructor(
    public navCtrl: NgxNavigationWithDataComponent,
    private assetService: AssetService,
    private _authService:AuthService,
    private cd: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (Object.keys(this.navCtrl.data).length === 0) {
      this.navCtrl.navigate("assets")
      return
    }
    this.product_data = this.navCtrl.data;
    this.product_data.NoOfFeatures = Array(this.product_data.NoOfFeatures).fill(this.product_data.NoOfFeatures).map((x, i) => i);
    this.getAssetDetails();
    this.getCategpries(this.product_data.ClientID);
  }

  getCategpries(clientID: string) {
    // this._categoryService.getDataByClient(clientID).subscribe(response => {
    this._categoryService.getData().subscribe(response => {
      this.categories = response.body
    })
  }

  ngOnInit() {
    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    // const reg = `(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/?`;

    this.simpleForm = this.fb.group({
      Name: ["", Validators.required],
      CategoryID: [this.product_data.CategoryID, Validators.required],
      Title: ["", Validators.required],
      // AssetBundle: [this.product_data.assetPicture.AssetBundle],
      Description: ["", Validators.required],
      MarkingNumber: [null, Validators.required],
      ProductImage: [""],
      ProductVideo: [""],
      ProductVideoURL: [""],
      AssetID: [this.product_data.AssetID],
      PictureID: [this.product_data.assetPicture.PictureID],
      MarkingImgURL: [""],
      MarkingVideoURL: [""]
      // MarkingText: [""]
    })
  }

  getAssetDetails() {
    this.assetService.getById(this.product_data.AssetID).subscribe(response => {
      let data: any = response.body;
      this.product_data = data;
      this.piPreview = [];
      this.pvPreview = [];
      this.product_data.NoOfFeatures = Array(data.NoOfFeatures).fill(data.NoOfFeatures).map((x, i) => i);
      if(this.product_data.assetPicture && this.product_data.assetPicture.assetUploads && this.product_data.assetPicture.assetUploads.length>0){
        this.product_data.assetPicture.assetUploads = _.map(
          this.product_data.assetPicture.assetUploads,
          x => {
            if(x.Type=='image')
            this.piPreview.push({url:x.URL, id:x.AssetUploadID});
            if(x.Type=='video')
            this.pvPreview.push({url:x.URL, id:x.AssetUploadID});
            return x;
          },
        );
      }
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }
    })
  }

  onSelectFeature(event) {
    this.simpleForm.patchValue({
      Title: "",
      Description: "",
      MarkingImgURL: "",
      MarkingVideoURL: ""
    })
    this.isHaving.mi = false
    this.isHaving.mv = false
    this.feiName = null
    this.feiName = null
    let featureData = _.find(this.product_data.assetMarking, {
      MarkingNumber: +event.target.value
    })
    console.log('not featureData',featureData);
    this.feiPreview = [];
    this.fevPreview = [];
    if (!featureData) {
      this.simpleForm.patchValue({
        Title: "",
        Description: "",
        MarkingImgURL: "",
        MarkingVideoURL: ""
      })
      return false
    }
    
    if(featureData.assetMarkingUploads.length>0){
      for (let index = 0; index < featureData.assetMarkingUploads.length; index++) {
        const element = featureData.assetMarkingUploads[index];
        if(element.Type=='image')
        this.feiPreview.push({url:element.URL, id:element.AssetMarkingUploadID});
        if(element.Type=='video')
        this.fevPreview.push({url:element.URL, id:element.AssetMarkingUploadID});
      }
    }

    this.simpleForm.patchValue({
      MarkingNumber: +event.target.value,
      Title: featureData.Title,
      Description: featureData.Description,
      MarkingImgURL: this.iImages,
      MarkingVideoURL: this.iVideos
    })
    console.log(this.simpleForm.value);
  }

  onSubmitMarking() {
    this.submitted = true
    // if (this.simpleForm.invalid && (this.product_data.assetMarking.length< this.product_data.NoOfFeatures.length)) {
    if (this.simpleForm.invalid) {
      swal.fire("Invalid", "Please fill feature details", "error");
      return false;
    }
    console.log(this.simpleForm.value)
    // return false;
    this.assetService
      .createMarking(this.simpleForm.value, this.product_data.ClientID)
      .subscribe(
        response => {
          this.submitted = false
          this.getAssetDetails()
          let index = _.findIndex(this.product_data.assetMarking, {
            MarkingNumber: response.body.MarkingNumber
          })
          if (index >= 0) this.product_data.assetMarking[index] = response.body
          else this.product_data.assetMarking.push(response.body)
          swal.fire("Success", `Product updated successfully.`, "success")
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

  publishProduct(event) {
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
        console.log(result)
        if (result.value) {
          this.assetService
            .update({ Status: "published" }, this.product_data.AssetID)
            .subscribe(
              response => {
                console.log(response)
                swal
                  .fire("Success", "Product published successfully.")
                  .then(result => {
                    this.router.navigate(["/assets"])
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
      })
  }

  get f() {
    return this.simpleForm.controls
  }

  cancel() {
    this.navCtrl.navigate("/assets")
  }

  toggleAssets(flag, element, iClose?: boolean) {
    this.isHaving[element] = flag
    if (iClose) {
      if (element == "pv") {
        this.videoURL = true
        this.simpleForm.patchValue({
          ProductVideo: null
        })
        this.simpleForm.controls["ProductVideoURL"].enable()
      }
      this[element].nativeElement.value = ""
      this[`${element}Preview`] = null
      this[`${element}Name`] = null
    }
  }

  createFileList(files: Array<File>): FileList {
    return {
      length: files.length,
      item: (index: number) => files[index],
      * [Symbol.iterator]() {
        for (let i = 0; i < files.length; i++) {
          yield files[i];
        }
      },
      ...files,
    };
  }
  
  onFileChange(event, type: string) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files.length > this.product_data.UploadCount) {
        swal.fire(
          "Info",
          `You can select only ${this.product_data.UploadCount} images`,
          "info"
        )
        event.preventDefault()
        return false
      }
      let selectedFiles = [];
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader()
        const element = event.target.files[index];
        reader.readAsDataURL(element)
        reader.onload = () => {
          if (type == "fei") {
            this.feiPreview.push({url:reader.result as string, id:null});
            this.feiName = "File Choosen";
            selectedFiles.push(element);
            this.simpleForm.patchValue({
              MarkingImgURL: selectedFiles
            })
          } else if (type == "fev") {
            this.fevPreview.push({url:element, id:null});
            this.fevName = element.name;
            selectedFiles.push(element);
            this.simpleForm.patchValue({
              MarkingVideoURL: selectedFiles
            })
          } else if (type == "pi") {
            this.piPreview.push({url:reader.result as string, id:null});
            this.piName = "File Choosen";
            selectedFiles.push(element);
            this.simpleForm.patchValue({
              ProductImage: selectedFiles
            })
          } else {
            console.log('in product video');
            // this.pvPreview.push(reader.result as string);
            this.pvPreview.push({url:element, id:null});
            this.pvName = element.name
            this.videoURL = false;
            selectedFiles.push(element);
            this.simpleForm.controls["ProductVideoURL"].disable()
            this.simpleForm.patchValue({
              ProductVideo: selectedFiles
            })
          }
          this.cd.markForCheck()
        }
      }
    }
  }

  removeSelectedImage(event:any,index:number, type:string, id:string) {
    event.preventDefault();

    swal
      .fire({
        title: "Are you sure?",
        text: `This will be deleted permanently.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3262a5",
        cancelButtonColor: "#20a8d8",
        confirmButtonText: "Yes"
      })
      .then(result => {
        console.log(result)
        if (result.value) {
          if(!id){
            this[type].splice(index, 1);
            return false;
          }

          let deleteMethod = ['piPreview','pvPreview'].includes(type)?'deleteUpload':'deleteMarking';

          this.assetService[deleteMethod](id)
            .subscribe(
              response => {
                console.log(response)
                swal
                  .fire("Success", "Upload deleted successfully.")
                  .then(result => {
                    this[type].splice(index, 1);
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
      })
  }

  showAsset(asset: string, type: string) {
    if (!asset) {
      return
    }
    if (type == "image") {
      swal.fire({
        imageUrl: asset,
        width: 900,
        imageAlt: "Product",
        showClass: {
          popup: 'animated fadeIn faster'
        },
        // hideClass: {
        //   popup: 'animated fadeOut faster'
        // }
      })
    } else {
      if(typeof asset=="object"){
        asset = window.URL.createObjectURL(asset);
      }
      swal.fire({
        html: `
          <iframe width="100%" height="300" src="${asset}" frameborder="0"></iframe>
        `
      })
    }
  }
}
