import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
];
