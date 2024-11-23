import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Token, CheckAuthToken, UserNames, AppointmentsResponse } from "./consult-appointment.component.types";
import { SendTokenService } from "../../services/auth_token/send-token.service";
import { LogoutComponent } from '../buttons/logout/logout.component';


@Component({
  selector: 'app-consult-appointment',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './consult-appointment.component.html',
  styleUrl: './consult-appointment.component.css'
})
export class ConsultAppointmentComponent {

  appointments_data: AppointmentsResponse = {
    ids: [],
    dates: [],
    times: [],
    specialty: [],
    doctor_names: [],
    locations: []
  };

  user_names: UserNames = {
    first_name: '',
    last_name:  ''
  }

  get_token!: Token;
  response_check_auth_token!: CheckAuthToken;
  show_modal: boolean = false;
  response_modal: string = '';

  constructor(
    private http: HttpClient, 
    private send_token_service: SendTokenService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const first_name = localStorage.getItem('first_name') || '';
      const last_name = localStorage.getItem('last_name') || '';
      this.user_names.first_name = first_name.toUpperCase();
      this.user_names.last_name = last_name.toUpperCase();
    }
  } 

  submit(username: string) {
    const body = JSON.stringify({ username });
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    if (token) {
      this.get_token = { token };
      this.send_token_service.Check_Token(token).subscribe({
        next: (data1) => {
          this.response_check_auth_token = data1;
          if (data1.response === 'user authenticated') {
            this.http
              .post<AppointmentsResponse>(
                'http://127.0.0.1:8000/consult_appointments_true',
                body,
                { headers, withCredentials: true }
              )
              .subscribe({
                next: (data2) => {
                  this.appointments_data = data2;
                },
                error: (error: HttpErrorResponse) => {
                  this.response_modal = error.error.response              
                  this.show_modal = true;
                  setTimeout(() => {
                    this.show_modal = false;
                  }, 1500);
                },
              });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.response_modal = error.error.detail;
          this.show_modal = true;
          setTimeout(() => {
            this.show_modal = false;
          }, 1500);
        },
      });
    }
  }  
}
