// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError, mergeAll } from 'rxjs/operators';
// import { InviteTravel } from 'src/app/invite-travels/03-app/invite-travel.service';
// import { IOrbit } from 'src/app/invite-travels/01-domain/orbits-interface';
// import { orbitsActionEnum, setOrbits ,carsTypeActionEnum ,setCarsType ,startLocationsActionEnum, setStartLocations, setOrbitsSadir} from './orbits.actions';
// import { ICarTypes } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
// import { IStartLocation } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/i-startLocatins';
// import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';

// @Injectable()
// export class OrbitsEffects {


//   loadOrbits$ = createEffect(() => this.actions$.pipe(
//     ofType(orbitsActionEnum.startFetchOrbits),
//     mergeMap(() => this.inviteTravel.fetchOrbits()
//       .pipe(
//         map((orbits: IOrbit[]) => {
//           // console.log('effect orbits', orbits);
//           return (setOrbits({ orbits }));
//         },
//           catchError((err) => { console.log('load orbits', err); return EMPTY; })
//         ))
//     )
//   )
//   );

//   loadOrbitsSadir$ = createEffect(() => this.actions$.pipe(
//     ofType(orbitsActionEnum.startFetchOrbitsSadir),
//     mergeMap(() => this.inviteTravel.fetchOrbitsSadir()
//       .pipe(
//         map((orbitsSadir: IOrbitSadir[]) => {
//           // console.log('effect orbits', orbits);
//           return (setOrbitsSadir({ orbitsSadir }));
//         },
//           catchError((err) => { console.log('load orbits', err); return EMPTY; })
//         ))
//     )
//   )
//   );
//   loadCarsType$ = createEffect(() => this.actions$.pipe(
//     ofType(carsTypeActionEnum.startFetchCarsType),
//     mergeMap(() => this.inviteTravel.fetchCarsType()
//       .pipe(
//         map((carsType: ICarTypes[]) => {
//           // console.log('effect carsType', carsType);
//           return (setCarsType({ carsType }));
//         },
//           catchError((err) => { console.log('load carsType', err); return EMPTY; })
//         ))
//     )
//   )
//   );
//   loadStartLocations$ = createEffect(() => this.actions$.pipe(
//     ofType(startLocationsActionEnum.startFetchStartLocations),
//     mergeMap(() => this.inviteTravel.fetchStartLocations()
//       .pipe(
//         map((startLocations: IStartLocation[]) => {
//           // console.log('effect startLocations', startLocations);
//           return (setStartLocations({ startLocations }));
//         },
//           catchError((err) => { console.log('load startLocations', err); return EMPTY; })
//         ))
//     )
//   )
//   );





//   constructor(
//     private actions$: Actions,
//     private inviteTravel: InviteTravel
//   ) { }
// }
