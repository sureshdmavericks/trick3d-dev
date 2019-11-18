import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 

  public loginForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.loginForm.valid)
    // this._authService.login();
    this.router.navigateByUrl('/dashboard')
    return;
  }

}
