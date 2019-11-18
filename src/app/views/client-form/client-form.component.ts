import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {
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
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      website: ['', [Validators.required] ],
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

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    // TODO: Use EventEmitter with form value
    console.warn(this.simpleForm.value);
    // alert('SUCCESS!');
    this._router.navigateByUrl('client-management')
  }

}
