import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState, provideStore } from '@ngrx/store';
import { userFeatureKey, userReducer } from './app/ngrx/user/user.reducer';
import { MoviesFeatureKey, moviesReducer } from './app/ngrx/movies/movies.reducer';
import { UserEffect } from './app/ngrx/user/user.effect';
import { provideEffects } from '@ngrx/effects';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideState(userFeatureKey, userReducer),
    provideState(MoviesFeatureKey, moviesReducer),
    provideEffects(UserEffect),
    provideStoreDevtools(),
    provideRouter([
      ...appRoutes
    ]),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(AngularFireAuthModule),
    importProvidersFrom(AngularFirestoreModule),
    importProvidersFrom(AngularFireStorageModule),
  ],
}).catch((err) => console.error(err));