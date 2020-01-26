import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AssetService } from "../asset.service"
import { ClientService } from "../../client-management/client.service"
import { CategoryService } from "../../category-management/category.service"
import * as _ from "lodash";
import swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private _dataService: AssetService,
    private _clientService: ClientService,
    private _categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private _router: Router
  ) {
    this.createForm();
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
    let clientID = this.simpleForm.controls["ClientID"].value
    this._categoryService.getDataByClient(clientID).subscribe(response => {
      this.categories = response.body;
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

    this._dataService.create(_.omit(this.simpleForm.value,['sub_category'])).subscribe(response => {
      swal.fire('Success','Product added.','success')
      .then(result=>{
        this._router.navigateByUrl('assets');
      });
    }, error=>{
      swal.fire('Oops!','Something went wrong.','error');
    })
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
