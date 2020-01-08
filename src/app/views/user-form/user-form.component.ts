import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationFormsService } from './validation-forms.service';
import { UserService } from '../user-management/user.service';

export class User {
  RoleID:number;
  FirstName:string;
  LastName:string;
  UserName:string;
  Email:string;
}

@Component({
  templateUrl: './user-form.component.html',
  providers:[ValidationFormsService, UserService]
})
export class UserFormComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  roles;

  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private _userService:UserService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){
    this.getRoles();
  }

  createForm() {
 
    this.simpleForm = this.fb.group({
      RoleID:[0, [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      UserName: ['', [Validators.required, Validators.minLength(this.vf.formRules.usernameMin), Validators.pattern(this.vf.formRules.nonEmpty)] ],
      Email: ['', [Validators.required, Validators.email] ],
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
    this._userService.create(this.simpleForm.value).subscribe((data:any)=>{
      console.log(data)
      this._router.navigateByUrl('user-management')
    })
  }

  getRoles(){
    this._userService.roles().subscribe((data:any)=>{
      this.roles = data.body;
    }, err=>{
      console.log(err)
    })
  }

}
