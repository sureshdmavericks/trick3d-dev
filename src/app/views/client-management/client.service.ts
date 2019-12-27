import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
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
  dataUrl = environment.API_URL + '/users/clients';

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
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  create(data:any) {
    return this.http.post(this.dataUrl, data, {
          observe: 'response',
          headers: new HttpHeaders().set('Authorization', this.authHeader)
        }
      )
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
