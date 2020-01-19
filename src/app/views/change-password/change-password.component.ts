import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      CurrentPassword : ['', [Validators.required]],
      Password : ['', [Validators.required]],
      ConfirmPassword : ['', [Validators.required]],
    })
  }

}
