import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  providers: [LoginService, AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm:FormGroup

  constructor(
    private fb:FormBuilder,
    private _authService:AuthService,
    private _router:Router,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      Email:['', [Validators.required, Validators.email]]
    })
  }

  public get f(){
    return this.forgotForm.controls;
  }

  public onSubmit(){
    let form = this.forgotForm;
    if(form.invalid) return;

    console.log(form.value);
    this._loginService.forgot(form.value).subscribe((res:any)=>{
      console.log(res)
      swal.fire('Hey!', 'Reset Password link sent','success')
      this._router.navigate(['/login']);
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire('Oops!',error.error.error.message || `something went wrong`, 'error')
      }
    })

  }


}
