import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, Event } from "@angular/router"
import { ClientService } from "../client-management/client.service"
import swal from "sweetalert2"
import { AuthService } from '../../authentication/auth.service'

@Component({
  templateUrl: "./client-form.component.html",
  providers: [ClientService, AuthService]
})
export class ClientFormComponent implements OnInit {
  simpleForm: FormGroup
  submitted = false
  formErrors: any

  constructor(
    private fb: FormBuilder,
    private _authService:AuthService,
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
      error => {
        if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
          console.log('in token error');
          this._authService.logout();
        }else{
          swal.fire('Oops!',error.error.error.message || `something went wrong`, 'error')
        }
      }
    )
  }
}
