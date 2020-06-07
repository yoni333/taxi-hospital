import { Injectable } from '@angular/core';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { AuthRepository } from 'src/app/auth/02-repository/auth-store.repository';

import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';
import { switchMap, catchError, map, take, tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { SadirTravelsRepository } from '../02-repository/sadir-travels.repository';
import { ISadirTravel, IPassenger } from '../01-domain/sadir-travels.interface';
import { isAllowUpdateCharge } from '../02-repository/utils.repositoty';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { Store, select } from '@ngrx/store';
import { allSadirTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.selectors';

@Injectable()
export class SadirTravelsService {
  _travels$: Observable<any>;
  currentUser: IUserDetails = null;
  constructor(
    private authRepository: AuthRepository
    , private travelsRepository: SadirTravelsRepository
    , private _store: Store<StateTravels>
  ) {

  }

  getCurrentUser(): Observable<IUserDetails> {
    return this.authRepository.getUserDetails();
  }

  getCurrentUserTravels(): Observable<ISadirTravel[]> {
    return this.getCurrentUser().pipe(
      switchMap((user: IUserDetails) => this.travelsRepository.fetchSadirTravelsByUser(user.uid))
    );

  }
  getCurrentUserNextTravels(): Observable<ISadirTravel[]> {
    return this.getCurrentUser().pipe(
      catchError(err => {
        console.log(' getCurrentUserNextTravels Handling error locally and rethrowing it...', err);
        return throwError(err);
      }),
      switchMap((user: IUserDetails) => {
        console.log(user.uid);
        // TODO replace the fake date in current

        return this.travelsRepository.fetchNextSadirTravelsByUser(user.uid, this.currentDate());
      })

    );

  }
  currentDate(): number {
    // use valueOf (instead of unix() )to convert to millisecond - like the timestamp saved in db
    return dayjs().startOf('day').valueOf();
  }
  fakeOldDate() {
    console.log(dayjs('2019-11-22').valueOf());

    return dayjs('2019-11-22').valueOf();
  }
  getTravelByUID(uid: string): Observable<ISadirTravel> {
    return of(uid).pipe(take(1)
      , switchMap(
        (uid: string) => this._store.pipe(select(allSadirTravels)
        , tap((allSadirTravels: ISadirTravel[]) => { console.log('uid', uid, allSadirTravels, allSadirTravels.filter((travel: ISadirTravel) => travel.id === uid)); return allSadirTravels.filter((travel: ISadirTravel) => travel.id === uid)[1]; })
          , map((allSadirTravels: ISadirTravel[]) => { console.log('uid', uid); return allSadirTravels.filter((travel: ISadirTravel) => travel.id === uid)[0]; })
          , catchError(err => { console.log(err); return EMPTY; })

        )
      )
      , catchError(err => { console.log(err); return EMPTY; })
    );

  }
  updateSadirTravelCharge(uid: string, amount: number, passengersData: IPassenger[], isDriverUpdateMoneyReceived: boolean, allowMoneyReceivedFromDriver: boolean) {
    // TODO remove the comment on this function
    // isAllowUpdateCharge(allowMoneyReceivedFromDriver)

    if (amount < 0) { return; }
    this.getTravelByUID(uid).subscribe((travel: ISadirTravel) => {
      console.log('uid', uid);
      console.log('updateSadirTravelCharge', travel);

      const updatedPassengers = travel.passengers.map(passenger => {
        const newPassenger =  JSON.parse(JSON.stringify(passenger));

        passengersData.forEach(passengerData => {
          if (passenger.name === passengerData.name) {
            console.log('passenger', passenger.pay, passenger.name);

            newPassenger.pay = passengerData.pay;
          }
        });
        return newPassenger;
      });
      this.travelsRepository.updateSadirTravelCharge(uid, amount, updatedPassengers, isDriverUpdateMoneyReceived);
    }).unsubscribe();
  }

  mergePassengersData() {

  }
  setCurrentSadirTravelUID(uid: string) {
    this.travelsRepository.setCurrentSadirTravelUID(uid);
  }

  getCurrentSadirTravel(): Observable<ISadirTravel> {
    return this.travelsRepository.getCurrentSadirTravel();
  }
}
