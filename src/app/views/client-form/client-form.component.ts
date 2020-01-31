import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, Event } from "@angular/router"
import { ClientService } from "../client-management/client.service"
import swal from "sweetalert2"

@Component({
  templateUrl: "./client-form.component.html",
  providers: [ClientService]
})
export class ClientFormComponent implements OnInit {
  simpleForm: FormGroup
  submitted = false
  formErrors: any

  constructor(
    private fb: FormBuilder,
    private dataTableService: ClientService,
    private _router: Router
  ) {
    this.createForm()
  }

  ngOnInit() {}

  createForm() {
    this.simpleForm = this.fb.group({
      FullName: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      FirstName: ["", [Validators.required]],
      Address: ["", [Validators.required]],
      Website: ["", [Validators.required]]
    })
  }

  get f() {
    return this.simpleForm.controls
  }

  onReset() {
    this.submitted = false
    this.simpleForm.reset();
    this._router.navigate(['/client-management'])
  }

  onSubmit() {
    this.submitted = true
    if (this.simpleForm.invalid) {
      return
    }

    this.dataTableService.create(this.simpleForm.value).subscribe(
      res => {
        swal
          .fire("Success", "Client added successfully", "success")
          .then(result => {
            this._router.navigateByUrl("client-management")
          })
      },
      err => {
        swal.fire(
          "Oops!",
          err.error.error.message || "something went wrong",
          "error"
        )
      }
    )
  }
}
