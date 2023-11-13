import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validateCred(formData: any): Observable<any>{
    return this.http.post<any>(environment.restApi+'users/validate', formData, { observe: 'response' });
  }
}
