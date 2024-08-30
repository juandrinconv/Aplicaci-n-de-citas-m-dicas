import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SendTokenService } from "../../services/auth_token/send-token.service";
import { CheckAuthToken, Token, UserNames} from './services.types';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from "../buttons/logout/logout.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  response_user_names: UserNames = {
    first_name: '',
    last_name:  ''
  }
  get_token!: Token;
  response_check_auth_token!: CheckAuthToken;
  isAuthenticated = false;
  
  constructor(
    private send_token_service: SendTokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // Verifica si estás en el navegador
      const token = localStorage.getItem('token');
      if (token) {
        this.get_token = { token };
        this.send_token_service.Check_Token(token).subscribe({
          next: (data) => {
            this.response_check_auth_token = data;
            if (data.response === 'user authenticated') {
              this.isAuthenticated = true;
              const first_name = localStorage.getItem('first_name') || '';
              const last_name = localStorage.getItem('last_name') || '';
              this.response_user_names.first_name = first_name.toUpperCase();
              this.response_user_names.last_name = last_name.toUpperCase();
            } else {
              this.router.navigate(['/login']);
            }
          },
          error: () => {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
