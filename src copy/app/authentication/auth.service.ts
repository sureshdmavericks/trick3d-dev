import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private jwtHelperService: JwtHelperService) {}

  getData() {
    let mainData = sessionStorage.getItem("token");
    let step2 = null;
    if (mainData) {
      step2 = mainData;
    }
    let adminData = this.getDecodedAccessToken(step2) || {};
    console.log('adminData:',adminData)
    if (step2) adminData.token = step2;
    return adminData;
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter()

    if (!token) {
      return false
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)

    return !tokenExpired
  }

  getToken() {
    let appData = this.getData();
    return appData ? appData.token : false;
  }

  setData(data) {
    sessionStorage.setItem("token", data);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

