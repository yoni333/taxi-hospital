import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// navigate
import { NavigateComponent } from './navigate/navigate.component';
import { MaterialNavigateModule } from './infrastructure/material-ui/material-ui-navigates.module';

// firebase

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './infrastructure/ngrx-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// import { TravelsEffects } from './infrastructure/ngrx-store/travels/travels.effects';
// import { OrbitsEffects } from './infrastructure/ngrx-store/orbits/orbits.effects';
@NgModule({
  declarations: [
    AppComponent
    , NavigateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialNavigateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireFunctionsModule, // imports firebase/firestore, only needed for callable functions
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireFunctionsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    // EffectsModule.forRoot([TravelsEffects,OrbitsEffects]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

 ],
 providers: [
   
    // { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5001' }
    // { provide: FUNCTIONS_ORIGIN, useValue: 'https://us-central1-learnfirestore-rxjs.cloudfunctions.net' }

 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
