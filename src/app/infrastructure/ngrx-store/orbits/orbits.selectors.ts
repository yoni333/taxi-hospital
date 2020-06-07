// import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
// import { StateOrbits } from './orbits.reducers';
// import { IOrbit } from 'src/app/invite-travels/01-domain/orbits-interface';
// import { ICarTypes } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/Icar-types';
// import { IStartLocation } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/i-startLocatins';
// import { IOrbitSadir } from '../../../../../../../pych/pych-admin/src/app/admin/interfaces/orbit-sadir';
// // orbits
// export const selectOrbitsFeature: MemoizedSelector<object, StateOrbits> = createFeatureSelector('orbits');
// export const selectOrbits: MemoizedSelector<object, IOrbit[]> = createSelector(selectOrbitsFeature, (state: StateOrbits) => state.orbits);
// export const selectOrbitsSadir: MemoizedSelector<object, IOrbitSadir  []> = createSelector(selectOrbitsFeature, (state: StateOrbits) => state.orbitsSadir);
// // car types
// export const selectCarsTypeFeature: MemoizedSelector<object, StateOrbits> = createFeatureSelector('carsType');
// export const selectCarsType: MemoizedSelector<object, ICarTypes[]> = createSelector(selectOrbitsFeature, (state: StateOrbits) => state.carsType);
// // start locations
// export const selectStartLocationsFeature: MemoizedSelector<object, StateOrbits> = createFeatureSelector('startLocations');
// export const selectStartLocations: MemoizedSelector<object, IStartLocation[]> = createSelector(selectOrbitsFeature, (state: StateOrbits) => state.startLocations);

