import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './initial-upload.component.html',
})
export class InitialUploadComponent implements OnInit {

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    private fb: FormBuilder,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){

  }

  createForm() {
    this.simpleForm = this.fb.group({
      ClientID: ['', [Validators.required]],
      CategoryID: ['', [Validators.required]],
      sub_category:['', [Validators.required]],
      Name: ['', [Validators.required] ],
      Upload: ['', [Validators.required] ],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  }

  cancel(){
    this._router.navigateByUrl('assets')
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    // TODO: Use EventEmitter with form value
    console.warn(this.simpleForm.value);
    // alert('SUCCESS!');
    this._router.navigateByUrl('assets')
  }

}
