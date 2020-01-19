import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './client-marking.component.html',
})
export class ClientMarkingComponent implements OnInit {

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit(){

  }

  createForm() {
    this.simpleForm = this.fb.group({
      asset_name: ['', [Validators.required] ],
      asset_upload: ['', [Validators.required] ],
      asset_png1: ['', [Validators.required] ],
      asset_png2: ['', [Validators.required] ],
      notes:['', [Validators.required]]
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
