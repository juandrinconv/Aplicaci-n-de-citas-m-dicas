import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SendTokenService } from "../../../services/auth_token/send-token.service";
import { CommonModule } from '@angular/common';
import { CheckAuthToken, Token, AssignAppointmentResponse } from "./assign-appointment.component.types";


@Component({
  selector: 'app-assign-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assign-appointment.component.html',
  styleUrl: './assign-appointment.component.css'
})
export class AssignAppointmentComponent {

  get_token!: Token;
  response_check_auth_token!: CheckAuthToken;
  response_assign_appointment!: AssignAppointmentResponse;
  show_modal: boolean = false;

  @Input() id!: string; 
  @Output() assign_clicked = new EventEmitter<string>(); 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private send_token_service: SendTokenService,
  ) { }

  AssignAppointment(id: string) {
    this.assign_clicked.emit(this.id);

    const body = JSON.stringify({id})
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    if (token) {
      this.get_token = { token }
      this.send_token_service.Check_Token(token).subscribe({
        next: (data1) => {
          this.response_check_auth_token = data1

          if (data1.response === 'user authenticated') {
            this.http.post<AssignAppointmentResponse>('http://127.0.0.1:8000/assign_appointments',
              body,
              { headers, withCredentials: true }).subscribe({
                next: (data2) => {
                  this.response_assign_appointment = data2 
                  this.show_modal = true
                  setTimeout(() => {
                    this.show_modal = false,
                    this.router.navigate(['/services'])
                  }, 1500)
                }
              })
          }
        }
      })
    }
  }
}