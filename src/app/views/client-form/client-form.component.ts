import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../client-management/client.service';

@Component({
  templateUrl: './client-form.component.html',
  providers:[ClientService]
})
export class ClientFormComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    private fb: FormBuilder,
    private dataTableService: ClientService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){

  }

  createForm() {
    this.simpleForm = this.fb.group({
      FullName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required]],
      Website: ['', [Validators.required] ],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  }

  onSubmit() {

    this.submitted = true;

    console.log(this.simpleForm)

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    console.warn(this.simpleForm.value);
    this.dataTableService.create(this.simpleForm.value).subscribe(res=>{
        console.log(res);
        this._router.navigateByUrl('client-management')
    })
  }

}
