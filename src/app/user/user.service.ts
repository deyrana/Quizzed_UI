import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUserData(userForm: any): Observable<any> {
    return this.http.post<any>(environment.restApi + 'users', userForm, { observe: 'response' });
  }

  getUserData(username: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(environment.restApi + 'users/user', {
      params: params
    });
  }


  fetchAllIcons(): Observable<any[]>{
    return this.http.get<any[]>(environment.restApi + 'images');
  }



}
