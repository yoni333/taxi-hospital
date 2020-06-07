// import { createAction, props } from '@ngrx/store';
// import { IPrivateTravel } from 'src/app/travels/01-domain/private-travels.interface';
// import { ISadirTravel } from 'src/app/travels/01-domain/sadir-travels.interface';

// export enum travelsActionEnum {
//   clearData = '[Travels] clear all travels data',
//   setPrivateTravels = '[Travels] set PrivateTravels',
//   setNextPrivateTravels = '[Travels] set next PrivateTravels',
//   setSadirTravels=  '[Travels] set SadirTravels',
//   setNextSadirTravels = '[Travels] set next SadirTravels',
//   setCurrentSadirTravels = '[Travels] set CurrentSadirTravels UID',
//   setCurrentPrivateTravels = '[Travels] set CurrentPrivateTravels UID',
//   startFetchPrivateTravels = '[Travels] start Fetch old private travels',
//   startFetchNextPrivateTravels = '[Travels] start Fetch next private travels',
//   startFetchSadirTravels = '[Travels] start Fetch old sadir travels',
//   startFetchNextSadirTravels = '[Travels] start Fetch next sadir travels',
// }
// export const clearDataTravels = createAction(
//   travelsActionEnum.clearData,
//   props()
// );
// export const setPrivateTravels = createAction(
//   travelsActionEnum.setPrivateTravels,
//   props<{ privateTravels: IPrivateTravel[] }>()
// );
// export const setNextPrivateTravels = createAction(
//   travelsActionEnum.setNextPrivateTravels,
//   props<{ privateTravels: IPrivateTravel[] }>()
// );

// export const setSadirTravels = createAction(
//   travelsActionEnum.setSadirTravels,
//   props<{ sadirTravels: ISadirTravel[] }>()
// );

// export const setNextSadirTravels = createAction(
//   travelsActionEnum.setNextSadirTravels ,
//   props<{ sadirTravels: ISadirTravel[] }>()
// );

// export const setCurrentSadirTravels = createAction(
//   travelsActionEnum.setCurrentSadirTravels,
//   props<{ sadirUID: string }>()
// );

// export const setCurrentPrivateTravels = createAction(
//   travelsActionEnum.setCurrentPrivateTravels ,
//   props<{ privateUID: string }>()
// );
