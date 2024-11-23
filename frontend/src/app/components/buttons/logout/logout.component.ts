import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Response } from "./logout.componet";


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  response: Response = {
    response: ''
  }
  token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient, private router: Router) { }

  Logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.token}`
    });

    this.http.post<Response>('http://127.0.0.1:8000/logout', {}, { headers, withCredentials: true }).subscribe({
      next: (data) => {
        localStorage.removeItem('token');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    })
  }
}
