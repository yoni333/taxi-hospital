// import { Action, createReducer, on } from '@ngrx/store';
// import { IOrbit } from 'src/app/invite-travels/01-domain/orbits-interface';
// import * as Orbits from './orbits.actions'
// import { ICarTypes } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
// import { IStartLocation } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/i-startLocatins';
// import { state } from '@angular/animations';
// import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';
// export interface StateOrbits {
//   orbits: IOrbit[];
//   orbitsSadir: IOrbitSadir[];
//   carsType:ICarTypes[];
//   startLocations:IStartLocation[];

// }

// export const initialState: StateOrbits = {
//   orbits: [], 
//   orbitsSadir: [], 
//   carsType:[],
//   startLocations:[],
// };

// const orbits = createReducer(
//   initialState,
//   on(Orbits.clearOrbits, (state: StateOrbits):StateOrbits => ({...state,orbits:[],orbitsSadir:[]})),
//   on(Orbits.setOrbits, (state: StateOrbits, { orbits }) => {
//     // console.log('setOrbits reducer ', orbits);

//     return ({
//       ...state
//       , orbits
//     });
//   }),
//   on(Orbits.setOrbitsSadir, (state: StateOrbits, { orbitsSadir }) => {
//     // console.log('setOrbits reducer ', orbits);

//     return ({
//       ...state
//       , orbitsSadir
//     });
//   }),
//   // **** *****cars type
//   on(Orbits.clearCarsType, (state: StateOrbits):StateOrbits => ({...state,carsType:[]})),
//   on(Orbits.setCarsType, (state: StateOrbits, { carsType }) => {
//     // console.log('setCarsType reducer ', carTypes);

//     return ({
//       ...state
//       , carsType
//     });
//   }),
//   // **** *****start location
//   on(Orbits.clearStartLocations, (state: StateOrbits) => ({...state,startLocations:[]})),
//   on(Orbits.setStartLocations, (state: StateOrbits, { startLocations }) => {
//     // console.log('setCarsType reducer ', carTypes);

//     return ({
//       ...state
//       , startLocations
//     });
//   }),
// );

// export function orbitsReducers(state: StateOrbits | undefined, action: Action) {
//   return orbits(state, action);
// }
