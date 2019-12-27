import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

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
      email:['', [Validators.required, Validators.email]]
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
      this._router.navigate(['/login']);
    }, error=>{
      console.log(error)
    })

  }


}
