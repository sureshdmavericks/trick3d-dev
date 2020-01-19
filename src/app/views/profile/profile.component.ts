import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-management/user.service';
import swal from "sweetalert2"

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
    private _router:Router,
    private _userService: UserService
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this._userService.getProfile().subscribe(response=>{
      console.log(response.body);
      this.simpleForm.patchValue({
        Email:response.body.Email,
        FirstName: response.body.FirstName,
        LastName: response.body.LastName,
        UserName: response.body.UserName
      })
    })
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

    if (this.simpleForm.invalid) {
      return;
    }

    console.warn(this.simpleForm.value);
    let data = {
      FirstName: this.simpleForm.controls['FirstName'].value,
      LastName: this.simpleForm.controls['LastName'].value
    }
    this._userService.updateProfile(data).subscribe(response=>{
      console.log(response.body)
      swal.fire("Success!", `Your profile has been updated.`, "success");
    })
  }
}


