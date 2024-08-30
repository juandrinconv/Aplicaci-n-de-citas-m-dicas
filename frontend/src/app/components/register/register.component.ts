import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserComplete } from "./register.types";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  response!: UserComplete;
  show_modal: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  redirect_login() {
    this.router.navigate(['/login'])
  }

  submit(first_name: string, last_name: string, username: string, email: string, password: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({first_name, last_name, username, email, password})
    
    this.http.post<UserComplete>('http://127.0.0.1:8000/create', body, { headers, withCredentials: true })
    .subscribe({
      next: (data) => {
        this.response = data;
        this.show_modal = true;
        setTimeout(() => {
          this.show_modal = false
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.response = {response: error.error.response};
        this.show_modal = true;
        setTimeout(() => {
          this.show_modal = false
        }, 1500)
      }
    });

  }
}
