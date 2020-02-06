import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers:[LoginService]
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup;
  public submitted = false;
  public login = {
    error: false,
    message: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _loginService:LoginService
  ){
    this.checkAuth()
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$#!%*?&].{8,}')
        ]
      ],
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid)
    return false;
    let data = this.loginForm.value;
    let logindata = {Email: data.username, Password: data.password}

    this._loginService.login(logindata).subscribe((res:any)=>{
      this.login = null;
      this._authService.setData(res.token);
      this.goRoute()

    }, error=>{
      this.login.error = true;
      this.login.message = error.error.error.message;
    })

    return;
  }

  goRoute(): void {
    this.router.navigate(['/dashboard']);
  }

  checkAuth() {
    let loginData = this._authService.getData();
    if (loginData) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(["/"]);
    }
  }

}
