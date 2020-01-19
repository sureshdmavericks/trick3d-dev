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
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getParentData() {
    return this.http.get<CategoryMgntData>(`${this.dataUrl}/parent`, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  postData(data:any) {
    return this.http.post(this.dataUrl, data, {
      observe: 'response',
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
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
