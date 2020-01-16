
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginData {
  username: string;
  password: string
}

const LoginUrl = environment.API_URL + '/users/login';
const ForgotUrl = environment.API_URL + '/users/forgot';

@Injectable()
export class LoginService {


  private readonly accessWithOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  login(data:any) {
    return this.http.post(LoginUrl, data, this.accessWithOptions)
      // .pipe(
      //   //retry(1), // retry a failed request up to 3 times
      //   catchError(this.handleError) // then handle the error
      // );
  }

  forgot(Email:any){
    console.log(Email)
    return this.http.post(ForgotUrl, Email, this.accessWithOptions)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
