import { Route } from '@angular/router';
import { SignInComponent } from './components/signin.component';
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
  { path: 'login', component: SignInComponent },
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
