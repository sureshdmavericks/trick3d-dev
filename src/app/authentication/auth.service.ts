import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private jwtHelper = new JwtHelperService();
  private tokenArray: Array<string> = [];

  constructor(private jwtHelperService: JwtHelperService, private router: Router) {}

  getData() {
    let mainData = JSON.parse(sessionStorage.getItem("token"));
    let step2 = null;
    if (mainData) {
      step2 = mainData[0];
    }
    let adminData = this.getDecodedAccessToken(step2) || {};
    if (step2) adminData.token = step2;
    return adminData;
  }

  public isAuthenticated(): boolean {
    let token:any;
    if(sessionStorage.getItem('token')!=null)
    token = JSON.parse(sessionStorage.getItem('token'))[0];
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isClient(): boolean {
    let user = this.getData()
    return user.clientID;
  }

  public isFromAdmin(): boolean {
    let token:Array<any> = [];
    if(sessionStorage.getItem('token')!=null)
    token = JSON.parse(sessionStorage.getItem('token'));
    return token.length > 1 ;
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

  setData(data:string, flag?:boolean) {
    // if(flag){
      this.tokenArray = JSON.parse(sessionStorage.getItem('token')) || [];
      console.log(this.tokenArray);
      this.tokenArray.unshift(data);
      sessionStorage.setItem("token", JSON.stringify(this.tokenArray));
    // }else{
    //   sessionStorage.setItem("token", data);
    // }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.tokenArray = [];
    this.router.navigate(['/login'])
  }
}

