import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError, EMPTY } from 'rxjs';
import { fsPath } from '../01-domain/firestore-path.enum';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { Store, select } from '@ngrx/store';
import { tap, shareReplay, catchError, map } from 'rxjs/operators';
import {  currentNextSadirTravel } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';
import { ISadirTravel, IPassenger } from '../01-domain/sadir-travels.interface';
import { ETravelType } from '../../shared/travel-type.enum';
import { addTravelType, convertOrbitField } from './utils.repositoty';
import { setCurrentSadirTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.actions';
import {dontShowBefore} from './shared';

@Injectable()
export class SadirTravelsRepository {

  dontShowBefore: number = dontShowBefore;


  constructor(
    private afs: AngularFirestore
    , private _store: Store<StateTravels>

  ) { }

  fetchSadirTravelsByUser(userUID: string): Observable<ISadirTravel[]> {
    // '2jriVqiCmdWtlI9A1BHTT1Tu7492'
    if (userUID === '' || userUID === null || userUID === undefined) {return EMPTY; }
    console.log('userUID',userUID);
    
    return this.afs.collection<ISadirTravel>(fsPath.sadirTravels
      , ref => ref
      // .where('agentsId', 'array-contains', userUID)
      .where('dateStartUNIXmoment', '>', this.dontShowBefore)
      .orderBy('dateStartUNIXmoment', 'desc'))
      .valueChanges()
      .pipe(
        map((travels: ISadirTravel[]) => addTravelType<ISadirTravel>(travels,ETravelType.sadir)),
        map((travels: ISadirTravel[]) => convertOrbitField<ISadirTravel>(travels,ETravelType.sadir)),
        shareReplay(),
        catchError(err => {
          console.log(' fetchTravelsByUser Handling error locally and rethrowing it...', err);
          return throwError(err);
      }));

  }

  fetchNextSadirTravelsByUser(userUID: string, todayUnixDate: number): Observable<ISadirTravel[]> {
    if (userUID === '' || userUID === null || userUID === undefined) {return EMPTY; }
      // '2jriVqiCmdWtlI9A1BHTT1Tu7492'
    return this.afs.collection<ISadirTravel>(fsPath.sadirTravels
        , ref => ref
        // .where('agentsId', 'array-contains', userUID)
          .where('dateStartUNIXmoment', '>=', todayUnixDate)
          .orderBy('dateStartUNIXmoment', 'desc'))

        .valueChanges()
        .pipe(
          map((travels: ISadirTravel[]) => addTravelType<ISadirTravel>(travels,ETravelType.sadir)),

          catchError(err => {
            console.log(' fetchNextTravelsByUser Handling error locally and rethrowing it...', err);
            return throwError(err);
        }),
          shareReplay()
          // , tap(answer => console.log('travels repo', answer))
        );

  }

  updateSadirTravelCharge(uid: string, amount: number, passengersData: IPassenger[], isDriverUpdateMoneyReceived: boolean): Promise<any> {

    if (uid != null && uid != undefined && uid != '') {

      return this.afs.collection<ISadirTravel>(fsPath.sadirTravels).doc(uid).set({ moneyReceivedFromDriver: amount, passengers: passengersData, isDriverUpdateMoneyReceived }, { merge: true }).then(res => console.log('update travel private moneyReceivedFromDriver')).catch(console.log);
    }
    return Promise.reject(() => console.log('travel not set'));

  }


  setCurrentSadirTravelUID(sadirUID: string) {
    this._store.dispatch(setCurrentSadirTravels({ sadirUID }));
  }

  getCurrentSadirTravel() {
    return this._store.pipe(select(currentNextSadirTravel));
  }
}
