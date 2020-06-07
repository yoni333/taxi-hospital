// import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
// import { StateTravels } from './travels.reducers';
// import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';
// import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';

// export const selectTravelsFeature: MemoizedSelector<object, StateTravels> = createFeatureSelector('travels');
// export const nextPrivateTravels: MemoizedSelector<object, IPrivateTravel[]> = createSelector(selectTravelsFeature, (state: StateTravels) => state.nextPrivateTravels);
// export const countNextPrivateTravels: MemoizedSelector<object, number> = createSelector(selectTravelsFeature, (state: StateTravels) => state.nextPrivateTravels.length);
// export const PrivateTravels: MemoizedSelector<object, IPrivateTravel[]> = createSelector(selectTravelsFeature, (state: StateTravels) => state.privateTravels);
// export const PrivateTravelsUID: MemoizedSelector<object, string> = createSelector(selectTravelsFeature, (state: StateTravels) => state.currentPrivate);

// export const currentNextPrivateTravel: MemoizedSelector<object, IPrivateTravel> = createSelector(
//   nextPrivateTravels,
//   PrivateTravelsUID,
//   (travels: IPrivateTravel[], uid: string) => { console.log(travels, uid)  ; return travels.filter(travel => travel.id === uid)[0]; }
//   );


//   // sadir selectors

// export const SadirTravels: MemoizedSelector<object, ISadirTravel[]> = createSelector(selectTravelsFeature, (state: StateTravels) => state.sadirTravels);
// export const nextSadirTravels: MemoizedSelector<object, ISadirTravel[]> = createSelector(selectTravelsFeature, (state: StateTravels) => state.nextSadirTravels);
// export const allSadirTravels: MemoizedSelector<object, ISadirTravel[]> = createSelector(selectTravelsFeature, (state: StateTravels) => state.nextSadirTravels.concat(state.sadirTravels));
// export const countNextSadirTravels: MemoizedSelector<object, number> = createSelector(selectTravelsFeature, (state: StateTravels) => state.nextSadirTravels.length);
// export const SadirTravelsUID: MemoizedSelector<object, string> = createSelector(selectTravelsFeature, (state: StateTravels) => state.currentSadir);

// export const currentNextSadirTravel: MemoizedSelector<object, ISadirTravel> = createSelector(
//     nextSadirTravels,
//     SadirTravelsUID,
//     (travels: ISadirTravel[], uid: string) => { console.log(travels, uid)  ; return travels.filter(travel => travel.id === uid)[0]; }
//     );


//   // count all next travels

// export const nextTravelsCounter: MemoizedSelector<object, number> = createSelector(
//     countNextSadirTravels
//     , countNextPrivateTravels
//     , (countSadir: number, countPrivate: number) => countSadir + countPrivate);


