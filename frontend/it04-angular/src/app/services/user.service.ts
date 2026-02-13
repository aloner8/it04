import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  create(data: any) {
    console.log('UserService.create called with data:', data);  
    return this.http.post(this.baseUrl, data);
  }

  getAll() {
    console.log('UserService.getAll called');
    return this.http.get(this.baseUrl);
  }
}
