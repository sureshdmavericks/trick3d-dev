
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

export interface LoginData {
  username: string;
  password: string
}

const LoginUrl = environment.API_URL + '/users/login';
const LogoutUrl = environment.API_URL + '/users/logout';
const ForgotUrl = environment.API_URL + '/users/forgot';
const FLogout = environment.API_URL + '/users/force/logout';

@Injectable()
export class LoginService {


  private readonly accessWithOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  login(data:any) {
    return this.http.post(LoginUrl, data, this.accessWithOptions)
  }

  logout(token:string) {
    return this.http.post(LogoutUrl,{token}, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
  }

  forceLogout(email:string) {
    return this.http.post(FLogout,{email}, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
  }

  forgot(Email:any){
    return this.http.post(ForgotUrl, Email, this.accessWithOptions)
  }

}
