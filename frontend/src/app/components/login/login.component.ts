import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserComplete } from "./login.types";
import { strict } from 'assert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  response!: UserComplete;
  show_modal: boolean = false; 

  constructor(private http: HttpClient, private router: Router) { }

  redirect_register() {
    this.router.navigate(['/register']);
  }

  redirect_recover_password() {
    this.router.navigate(['/recover_password'])
  }

  submit(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ username, password });
    
    this.http.post<UserComplete>('http://127.0.0.1:8000/login', body, { headers, withCredentials: true })
      .subscribe({
        next: (data) => {
          this.response = data;
          this.show_modal = true;
          if (this.response.token && this.response.user_names) {
            const token_user = this.response.token;
            const first_name = this.response.user_names.first_name;
            const last_name = this.response.user_names.last_name;
            const username = this.response.user_names.username;
            localStorage.setItem('token', token_user);
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('last_name', last_name);
            localStorage.setItem('username', username);
          }
          setTimeout(() => {
            this.show_modal = false,
            this.router.navigate(['/services'])
          }, 1500);
        },
        error: (error: HttpErrorResponse) => {                
          this.response = {response: error.error.response}
          this.show_modal = true;
          setTimeout(() => {
            this.show_modal = false;
          }, 1500);
        }
      });
    }
}
