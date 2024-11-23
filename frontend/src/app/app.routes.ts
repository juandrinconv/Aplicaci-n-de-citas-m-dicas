import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ServicesComponent } from './components/services/services.component';
import { RequestAMedicalAppointmentComponent } from './components/request-a-medical-appointment/request-a-medical-appointment.component';
import { ConsultAppointmentComponent } from './components/consult-appointment/consult-appointment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'recover_password', component: RecoverPasswordComponent, title: 'Recover Password' },
    { path: 'services', component: ServicesComponent, title: 'Services'},
    { path: 'request_a_medical_appointment', component: RequestAMedicalAppointmentComponent, title: 'Request a Medical Appointment'},
    { path: 'consult_appointment', component: ConsultAppointmentComponent, title: 'Consult Appointment' },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
