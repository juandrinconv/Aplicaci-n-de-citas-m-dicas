import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResponseComplete } from "../recover-password/recover-password.types";

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  response!: ResponseComplete;
  show_modal: boolean = false; 

  constructor(private http: HttpClient, private router: Router) { }

  redirect_login() {
    this.router.navigate(['/login']);
  }

  submit(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ email });

    this.http.post<ResponseComplete>('http://127.0.0.1:8000/recover_password', body, { headers, withCredentials: true })
    .subscribe({
      next: (data) => {
        this.response = data
        this.show_modal = true; 
        setTimeout(() => {
          this.show_modal = false; 
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.response = error.error;
        this.show_modal = true;
        setTimeout(() => {
          this.show_modal = false;
        }, 1500);
      }
    });
  }
}
