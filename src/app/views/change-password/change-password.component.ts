import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { UserService } from "../user-management/user.service"
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  templateUrl: "./change-password.component.html",
  providers: [UserService],
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup

  constructor(private fb: FormBuilder, private _userSerice: UserService, private _authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      CurrentPassword: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]]
    })
  }

  onSubmit() {
    console.log(this.changePasswordForm.valid)
    console.log(this.changePasswordForm.value)

    if (this.changePasswordForm.invalid) {
      return
    }
    this._userSerice
      .changePassword(this.changePasswordForm.value)
      .subscribe(response => {
        let data:any = response.body;
        swal.fire('Success',`${data.message}. Please login again`,'success').then(result=>{
          this._authService.setData(null);
          sessionStorage.clear();
          this.router.navigate(['/login'])
        });
      }, err=>{
        console.log(err);
        swal.fire('Oops!',err.error.error.message || `something went wrong`, 'error')
      })
  }
}
