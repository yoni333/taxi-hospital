import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthRepository } from 'src/app/auth/02-repository/auth-store.repository';

import { IUserDetails } from 'src/app/auth/01-domain/user-details.interface';
import { switchMap, shareReplay, tap, catchError } from 'rxjs/operators';
import { IPrivateTravel } from '../01-domain/private-travels.interface';
import { PrivateTravelsRepository } from '../02-repository/private-travels.repository';
import * as dayjs from 'dayjs';
import { isAllowUpdateCharge } from '../02-repository/utils.repositoty';
import { IMoneyManagement } from '../01-domain/money-management.interface';

@Injectable()
export class PrivateTravelsService {
  _travels$: Observable<any>;
  currentUser: IUserDetails = null;
  constructor(
    private authRepository: AuthRepository
    , private travelsRepository: PrivateTravelsRepository
  ) {

  }

  getCurrentUser(): Observable<IUserDetails> {
    return this.authRepository.getUserDetails();
  }

  getCurrentUserTravels(): Observable<IPrivateTravel[]> {
    return this.getCurrentUser().pipe(
      switchMap((user: IUserDetails) => this.travelsRepository.fetchPrivateTravelsByUser(user.uid))
    );

  }
  getCurrentUserNextTravels(): Observable<IPrivateTravel[]> {
    return this.getCurrentUser().pipe(
      catchError(err => {
        console.log(' getCurrentUserNextTravels Handling error locally and rethrowing it...', err);
        return throwError(err);
    }),
      switchMap((user: IUserDetails) => {console.log(user.uid);
        // TODO replace the fake daate in urrent

                                         return this.travelsRepository.fetchNextPrivateTravelsByUser(user.uid, this.currentDate());
      })

    );

  }
  currentDate(): number {
    // use valueOf (insted of unix() )to convert to milisecond - like the timestamp saved in db
    return dayjs().startOf('day').valueOf();
  }
  fakeOldDate() {
    console.log(dayjs('2019-11-22').valueOf());

    return dayjs('2019-11-22').valueOf();
  }

  updatePrivateTravelCharge(uid: string, amount: number, _moneyManagement: IMoneyManagement) {
       // TODO remove the comment on this function
    // isAllowUpdateCharge(moneyManagement.allowMoneyReceivedFromDriver)
    const moneyManagement = JSON.parse(JSON.stringify(_moneyManagement));
    if (amount < 0 ) {return; }
    moneyManagement.actualChargeAgent = amount;
    this.travelsRepository.updatePrivateTravelCharge(uid, moneyManagement);
  }
  setCurrentPrivateTravelUID(uid: string) {
    this.travelsRepository.setCurrentPrivateTravelUID(uid);
  }

  getCurrentPrivateTravel(): Observable<IPrivateTravel> {
     return this.travelsRepository.getCurrentPrivateTravel();
  }
}
