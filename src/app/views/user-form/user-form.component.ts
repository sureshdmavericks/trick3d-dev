import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationFormsService } from './validation-forms.service';

@Component({
  templateUrl: './user-form.component.html',
  providers:[ValidationFormsService]
})
export class UserFormComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){

  }

  createForm() {
 
    this.simpleForm = this.fb.group({
      type:['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(this.vf.formRules.usernameMin), Validators.pattern(this.vf.formRules.nonEmpty)] ],
      email: ['', [Validators.required, Validators.email] ],
      // password: ['', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin), Validators.pattern(this.vf.formRules.passwordPattern)] ],
      // confirmPassword: ['', [Validators.required] ],
      // accept: [false, [Validators.requiredTrue] ]
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
    this._router.navigateByUrl('user-management')
  }

}
