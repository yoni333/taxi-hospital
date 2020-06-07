import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/05-ui/login/login.component';
import { MaterialUIModule } from './infrastructure/material-ui/material-ui.module';
import { AuthService } from './auth/03-app/auth-service';
import { NextTravelsComponent } from './travels/05-ui/next-travels/next-travels.component';
import { OldTravelsComponent } from './travels/05-ui/old-travels/old-travels.component';
import { PrivateTravelsService } from './travels/03-app/private-travels.service';
import { NextTravelsTableComponent } from './travels/05-ui/next-travels-table/travels-table.component';
import { PrivateTravelsRepository } from './travels/02-repository/private-travels.repository';
import { PassengersNamesComponent } from './travels/05-ui/passengers-names-private-travel/passengers-names.component';
import { OldTravelsTableComponent } from './travels/05-ui/old-travels-table/old-travels-table.component';
import { AuthGuardGuard } from './auth/03-app/auth-guard.guard';
import { DictionaryComponent } from './dictionary/05-ui/dictionary/dictionary.component';
import { OldSadirTravelsComponent } from './travels/05-ui/old-sadir-travels/old-sadir-travels.component';
import { SadirTravelsService } from './travels/03-app/sadir-travels.service';
import { SadirTravelsRepository } from './travels/02-repository/sadir-travels.repository';
import { InviteTravelComponent } from './invite-travels/05-ui/invite-travel/invite-travel.component';
import { OrbitsRepository } from './invite-travels/02-repository/orbits.repository';
import { OrbitPrivateListComponent } from './invite-travels/05-ui/orbit-private-list/orbit-private-list.component';
import { WantedTravels } from './invite-travels/02-repository/wanted-travel.repository';
import { StartLocationsComponent } from './invite-travels/05-ui/start-locations/start-locations';
import { OrbitSadirListComponent } from './invite-travels/05-ui/orbit-sadir-list/orbit-sadir-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
  , { path: 'invite-travels', component: InviteTravelComponent, canActivate: [AuthGuardGuard] }
  , { path: 'next-travels', component: NextTravelsComponent, canActivate: [AuthGuardGuard] }
  , { path: 'all-travels', component: OldTravelsComponent, canActivate: [AuthGuardGuard] }
  , { path: 'all-sadir-travels', component: OldSadirTravelsComponent, canActivate: [AuthGuardGuard] }
  , { path: 'passengers-names', component: PassengersNamesComponent, canActivate: [AuthGuardGuard] }
  , { path: 'dictionary', component: DictionaryComponent, canActivate: [AuthGuardGuard] }
  , { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    , CommonModule
    , ReactiveFormsModule
    , MaterialUIModule
  ],
  exports: [RouterModule],
  declarations: [
    LoginComponent
    , OldTravelsComponent
    , OldTravelsTableComponent
    , OldSadirTravelsComponent
    , NextTravelsComponent
    , NextTravelsTableComponent
    , PassengersNamesComponent
   
    , DictionaryComponent
    , InviteTravelComponent
    , OrbitPrivateListComponent
    ,OrbitSadirListComponent
    , StartLocationsComponent
  ],
  providers: [
    AuthService
    , PrivateTravelsService
    , PrivateTravelsRepository
    , SadirTravelsService
    , SadirTravelsRepository
    , OrbitsRepository
    , WantedTravels
  ]
})
export class AppRoutingModule { }
