import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  providers: [LoginService]
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm:FormGroup

  constructor(
    private fb:FormBuilder,
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
      console.log(error)
      swal.fire('Oh!', error.error.error.message, 'error');
    })

  }


}
