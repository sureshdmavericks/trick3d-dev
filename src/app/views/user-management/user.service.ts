import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../user-form/user-form.component';

export interface UserData {
  UserID: string;
  FirstName: string;
  LastName: string;
  FullName?: string;
  UserName?:string;
  SidebarColor?:string;
  FontColor?:string;
  HeaderColor?:string;
  Logo?:string;
  Email: string;
  ProfilePic?:string;
  Type:string;
  Status?: boolean;
  CreatedAt?: string;
}

export interface UserManagementData extends Array<UserData> {}

@Injectable()
export class UserService {

  dataUrl = environment.API_URL + '/users';
  roleUrl = environment.API_URL + '/roles';

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  getData() {
    return this.http.get<UserManagementData>(this.dataUrl,{
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      );
  }

  getProfile() {
    return this.http.get<UserData>(`${this.dataUrl}/me`,{
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
  }

  create(data:User) {
    data.RoleID = +data.RoleID
    return this.http.post(this.dataUrl, data, {
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      );
  }

  status(Status:boolean, id:string){
    return this.http.patch(
      this.dataUrl + `/${id}`, {Status}, {
        observe: 'response',
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      }
    );
  }

  updateProfile(data:any){

    let sdata = new FormData();
    sdata.append('FirstName',data.FirstName);
    sdata.append('LastName',data.LastName);
    if(data.HeaderColor)
    sdata.append('HeaderColor',data.HeaderColor);
    if(data.SidebarColor)
    sdata.append('SidebarColor',data.SidebarColor);
    if(data.FontColor)
    sdata.append('FontColor',data.FontColor);
    if(data.Logo)
    sdata.append('Logo',data.Logo);
    sdata.append('ProfilePic',data.ProfilePic);
    console.log(sdata);

    return this.http.patch(
      `${this.dataUrl}/profile`, sdata, {
        observe: 'response',
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      }
    );
  }

  changePassword(data:any){
    return this.http.post(
      `${this.dataUrl}/reset/password`, data, {
        observe: 'response',
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      }
    );
  }

  roles(){
    return this.http.get(
      this.roleUrl , {
        observe: 'response',
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      }
    );
  }
  
}
