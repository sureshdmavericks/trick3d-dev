import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

export interface CategoryData {
  CategoryID:string;
  Name: string;
  Parent:string;
  Status:string;
  ClientID:string;
  CreatedAt:string;
  CreatedBy:string;
  UpdatedAt:string;
  UpdatedBy:string;
}

export interface CategoryMgntData extends Array<CategoryData> {}

@Injectable()
export class CategoryService {
  dataUrl = `${environment.API_URL}/categories`;

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  constructor(private http: HttpClient, private _authService: AuthService) {}

  getData() {
    return this.http.get<CategoryMgntData>(this.dataUrl, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
  }

  getDataByClient(clientID:string) {
    return this.http.get<CategoryMgntData>(`${this.dataUrl}/client/${clientID}`, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
  }

  getParentData() {
    return this.http.get<CategoryMgntData>(`${this.dataUrl}/parent`, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
  }

  postData(data:any) {
    return this.http.post(this.dataUrl, data, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
  }
}
