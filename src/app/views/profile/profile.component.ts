import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-management/user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[UserService]
})
export class ProfileComponent implements OnInit {


  simpleForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _router:Router
  ) {
    this.createForm();
   }

  ngOnInit() {
  }
  
  createForm() {
    this.simpleForm = this.fb.group({
      UserName: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required] ],
      Email: ['', [Validators.required] ],
    });
  }

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


