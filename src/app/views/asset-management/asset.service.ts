import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

export interface AssetData {
  notification: string;
  createdAt: string
}

export interface AssetMgntData extends Array<AssetData> {}

@Injectable()
export class AssetService {
  dataUrl = `${environment.API_URL}/assets`;
  // dataUrl = `${environment.API_URL}/image/upload`;

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  getData() {
    return this.http.get<AssetMgntData>(this.dataUrl);
  }

  create(data:any):Observable<any> {
    let sdata = new FormData()
    sdata.append('CategoryID',data.CategoryID)
    sdata.append('ClientID',data.ClientID)
    sdata.append('Name',data.Name)
    sdata.append('NoOfFeatures',data.NoOfFeatures)
    sdata.append('Upload',data.Upload)
    return this.http.post(this.dataUrl, sdata, {
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
  }


}
