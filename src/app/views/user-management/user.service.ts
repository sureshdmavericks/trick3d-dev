import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../user-form/user-form.component';

export interface UserData {
  UserID: string;
  FirstName: string;
  LastName: string;
  FullName?: string;
  UserName?:string;
  Email: string;
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
    return this.http.patch(
      `${this.dataUrl}/profile`, data, {
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
