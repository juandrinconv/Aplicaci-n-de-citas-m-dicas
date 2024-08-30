import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'recover_password', component: RecoverPasswordComponent, title: 'Recover Password' },
    { path: 'services', component: ServicesComponent, title: 'Services'},
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Ruta por defecto
    { path: '**', redirectTo: 'login' }  // Ruta de redirección para rutas no definidas   
];
