import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }  else {
      sessionStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
