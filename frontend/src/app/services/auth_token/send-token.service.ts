import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckAuthToken } from "./send-token.types";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SendTokenService {

  constructor(private http: HttpClient, private router: Router) { }
  
  Check_Token(token: string): Observable<CheckAuthToken> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<CheckAuthToken>('http://127.0.0.1:8000/token_validation', { headers });
  }
}
