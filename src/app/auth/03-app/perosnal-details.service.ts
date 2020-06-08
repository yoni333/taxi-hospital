import { Injectable } from '@angular/core';
// firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { AngularFireFunctions } from '@angular/fire/functions';
// rxjs
import { Observable } from 'rxjs';
import { UserCredentialsWithClaims } from '../01-domain/custom-claims.interface';
import { take ,map, pluck} from 'rxjs/operators';
import { IUserDetails } from '../01-domain/user-details.interface';
import { AuthRepository } from '../02-repository/auth-store.repository';
import { Store } from '@ngrx/store';
// import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
// import { travelsActionEnum } from 'src/app/infrastructure/ngrx-store/travels/travels.actions';
// import { orbitsActionEnum, carsTypeActionEnum, setStartLocations, startLocationsActionEnum } from 'src/app/infrastructure/ngrx-store/orbits/orbits.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/shared/user.interface';
import  {USERS_PATH} from 'src/app/shared/fs-path'
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class PersonalDetailsService {
  private _user: Observable<User | null>;
  readonly USERS_PATH :string = USERS_PATH
  counterBugfix:number=0;
  constructor(
    public afAuth: AngularFireAuth
    , private fs: AngularFirestore
    , private authRepository: AuthRepository


  ) {
    this._user = this.afAuth.user;
  }




  get user(): Observable<IUser> {
    return this.authRepository.getUserDetails().pipe(
      pluck('user')
    )
  }

  updateUserDetails(user:IUser){
    console.log('user',user);
    
    this.fs.collection<IUser>(this.USERS_PATH).doc(user.docId).set(user,{merge:true})
    .then(res=>{
      alert('הפרטים עודכמו בהצלחה')
    })
  }


  

}
