import { Route } from '@angular/router';
import { SignInComponent } from './components/signin.component';
import { ProfileComponent } from './components/profile.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './components/home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

export const appRoutes: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'login', component: SignInComponent },
  { path: '', component: HomeComponent },
];
