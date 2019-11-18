import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {

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
      parent:[''],
      name: ['', [Validators.required]],
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
    console.warn(this.simpleForm.value);
    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      console.log('invalid')
      return;
    }
    console.log('Valid')

    // TODO: Use EventEmitter with form value
    console.warn(this.simpleForm.value);
    // alert('SUCCESS!');
    this._router.navigateByUrl('category-management')
  }

}
