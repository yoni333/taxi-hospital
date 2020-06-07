import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPrivateTravel } from '../01-domain/private-travels.interface';
import { Observable, throwError, EMPTY } from 'rxjs';
import { fsPath } from '../01-domain/firestore-path.enum';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { Store, select } from '@ngrx/store';
import { tap, shareReplay, catchError, map } from 'rxjs/operators';
import { setPrivateTravels, setCurrentPrivateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.actions';
import { currentNextPrivateTravel } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';
import { ETravelType } from '../../shared/travel-type.enum';
import { addTravelType, updateMoneyVersion } from './utils.repositoty';
import {dontShowBefore} from './shared';
import { IMoneyManagement } from '../01-domain/money-management.interface';
@Injectable()
export class PrivateTravelsRepository {

  dontShowBefore: number = dontShowBefore;
  constructor(
    private afs: AngularFirestore
    , private _store: Store<StateTravels>

  ) { }

  fetchPrivateTravelsByUser(userUID: string): Observable<IPrivateTravel[]> {
    // '2jriVqiCmdWtlI9A1BHTT1Tu7492'
    if (userUID === '' || userUID === null || userUID === undefined) {return EMPTY; }

    return this.afs.collection<IPrivateTravel>(fsPath.privateTravels
      , ref => ref
      .where('agent.agentAppUID', '==', userUID)
      .where('dateStartUNIXmoment', '>', this.dontShowBefore)
      .orderBy('dateStartUNIXmoment', 'desc'))
      .valueChanges()
      .pipe(
        map((travels: IPrivateTravel[]) => addTravelType<IPrivateTravel>(travels,ETravelType.private)),
        map((travels: IPrivateTravel[]) => travels.map((travel: IPrivateTravel) => updateMoneyVersion(travel))),

        shareReplay(),
        catchError(err => {
          console.log(' fetchTravelsByUser Handling error locally and rethrowing it...', err);
          return throwError(err);
      }));

  }

  fetchNextPrivateTravelsByUser(userUID: string, todayUnixDate: number): Observable<IPrivateTravel[]> {
    if (userUID === '' || userUID === null || userUID === undefined) {return EMPTY; }
      // '2jriVqiCmdWtlI9A1BHTT1Tu7492'
    return this.afs.collection<IPrivateTravel>(fsPath.privateTravels
        , ref => ref
        .where('agent.agentAppUID', '==', userUID)
          .where('dateStartUNIXmoment', '>=', todayUnixDate)
          .orderBy('dateStartUNIXmoment', 'desc'))

        .valueChanges()
        .pipe(
          map((travels: IPrivateTravel[]) => addTravelType<IPrivateTravel>(travels,ETravelType.private)),
          map((travels: IPrivateTravel[]) => travels.map((travel: IPrivateTravel) => updateMoneyVersion(travel))),

          catchError(err => {
            console.log(' fetchNextTravelsByUser Handling error locally and rethrowing it...', err);
            return throwError(err);
        }),
          shareReplay()
          // , tap(answer => console.log('travels repo', answer))
        );

  }

  updatePrivateTravelCharge(uid: string, moneyManagement: IMoneyManagement): Promise<any> {

    if (uid != null && uid != undefined && uid != '') {

      return this.afs.collection<IPrivateTravel>(fsPath.privateTravels).doc(uid).set({ money: moneyManagement }, { merge: true }).then(res => console.log('update travel private moneyReceivedFromDriver')).catch(console.log);
    }
    return Promise.reject(() => console.log('travel not set'));

  }


  setCurrentPrivateTravelUID(privateUID: string) {
    this._store.dispatch(setCurrentPrivateTravels({ privateUID }));
  }

  getCurrentPrivateTravel() {
    return this._store.pipe(select(currentNextPrivateTravel));
  }
}
