import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'change-asset',
  templateUrl: './change-asset-category.component.html',
})
export class ChangeAssetCategoryComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];
  cACForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _router: Router
    ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.cACForm = this.fb.group({
      category:['', [Validators.required]],
    });
  }

  get f() { return this.cACForm.controls; }

  onReset() {

    this.submitted = false;
    this.cACForm.reset();

  }

  onSubmit() {

    this.submitted = true;
    console.warn(this.cACForm.value);
    // stop here if form is invalid
    if (this.cACForm.invalid) {
      console.log('invalid')
      return;
    }
    console.log('Valid')
    this.bsModalRef.hide();

    // TODO: Use EventEmitter with form value
    console.warn(this.cACForm.value);
    // alert('SUCCESS!');
    this._router.navigateByUrl('assets')
  }

}
