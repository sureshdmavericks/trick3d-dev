import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

export interface ClientData {
  ClientID?: string;
  FirstName?: string;
  LastName?: string;
  FullName: string;
  Address:string;
  Website:string;
  Email: string;
  Status?: boolean;
  CreatedAt?: string;
  users?: Array<any>;
}

export interface ClientManagementData extends Array<ClientData> {}

@Injectable()
export class ClientService {
  dataUrl = environment.API_URL + '/clients';
  resendUrl = environment.API_URL + '/users/resend/link';

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`;
  }

  getData() {
    return this.http.get<ClientManagementData>(this.dataUrl,{
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  create(data:any):Observable<any> {
    return this.http.post(this.dataUrl, data, {
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  resend(data:any):Observable<any> {
    return this.http.post(this.resendUrl, data, {
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    
    return throwError(error);
  }
}
