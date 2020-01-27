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
  dataMarkingUrl = `${environment.API_URL}/asset-markings`;

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  getData() {
    return this.http.get<AssetMgntData>(this.dataUrl, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
  }

  getById(AssetID:string) {
    return this.http.get<AssetMgntData>(`${this.dataUrl}/${AssetID}`,{
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
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

  createMarking(data:any, ClientID:string):Observable<any>{
    let sdata = new FormData()
    sdata.append('Title', data.Title)
    sdata.append('Description', data.Description)
    sdata.append('MarkingNumber', data.MarkingNumber)
    sdata.append('AssetID', data.AssetID)
    if(data.MarkingImgURL)
    sdata.append('MarkingImgURL', data.MarkingImgURL)
    if(data.MarkingVideoURL)
    sdata.append('MarkingVideoURL', data.MarkingVideoURL)
    if(data.MarkingText)
    sdata.append('MarkingText', data.MarkingText)
    return this.http.post(`${this.dataMarkingUrl}?cid=${ClientID}`, sdata, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    }
  )
  }


}
