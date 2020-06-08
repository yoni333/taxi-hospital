import { Injectable } from '@angular/core';
// firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { AngularFireFunctions } from '@angular/fire/functions';
// rxjs
import { Observable } from 'rxjs';
import { UserCredentialsWithClaims } from '../01-domain/custom-claims.interface';
import { take ,map} from 'rxjs/operators';
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
export class AuthService {
  private _user: Observable<User | null>;
  readonly USERS_PATH :string = USERS_PATH
  counterBugfix:number=0;
  constructor(
    public afAuth: AngularFireAuth
    , private fns: AngularFireFunctions
    , private fs: AngularFirestore
    , private authRepository: AuthRepository
  ,    private router: Router,

    // , private _store: Store<StateTravels>

  ) {
    this._user = this.afAuth.user;
    this.setCurrentUser();
    // console.log('AuthService');
  }


  getCurrentAuth(): Observable<User> {
    console.log('getCurrentAuth step a');

    return this.afAuth.authState.pipe(take(1))
  }


  
  setCurrentUser() {
    this.getCurrentAuth().toPromise()


      .then(async (userFS: User) => {

        const _user = await this.getUserData(userFS.uid)
        
        const tmpUser: IUserDetails = { ...userFS, user: _user }
        console.log('getCurrentAuth step c',tmpUser ,_user);
        if (_user ===undefined){
          this.counterBugfix++
          if(this.counterBugfix<20){

            setTimeout(this.setCurrentUser.bind(this),1000)
          }

        }
        const userForStore: IUserDetails = userFS === null ? this.emptyUser() : this.createUserObject(tmpUser);
        console.log('getCurrentAuth step d', userForStore);
        this.setStoreUserDetails(userForStore);

      }).catch(console.log);
  }
  login(): Promise<void | auth.UserCredential> {
    // if success the this.afAuth.user will hold the user data as observable
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

  }

  async getAuthAfterRedirect(): Promise<IUserDetails|void> {
    return this.afAuth.auth.getRedirectResult()
      .then(async (loginData: UserCredentialsWithClaims) => {
        console.log('getAuthAfterRedirect step a', loginData);

        if (loginData.user === null) { 

          return Promise.reject('úser is null');
         }
        const user = await this.getUserData(loginData.user.uid)
        console.log('getAuthAfterRedirect step b', loginData);

        return <IUserDetails>{
          displayName: loginData.user.displayName,
          uid: loginData.user.uid,
          email: loginData.user.email,
          user
        }
      })
      .then((user: IUserDetails) => {
        this.setStoreUserDetails(user).then(() => { });

        return user;
      })


  }

  // addCustomClaimsToUserCredentials(loginData: UserCredentialsWithClaims) {
  //   return loginData.user.getIdTokenResult().then((token: auth.IdTokenResult) => {
  //     loginData.customClaims = { role: token.claims.role ,agent:null };
  //     return loginData;

  //   });

  // }

  getUserData(uid: string): Promise<IUser> {
    
    return this.fs.collection<IUser>(this.USERS_PATH,ref=>ref.where('userUID', '==' , uid)).valueChanges({idField:'docId'}).pipe(
      take(1),
      map(userArr=>userArr[0])
    ).toPromise()
    // return this.fns.httpsCallable('getCurrentAgent')({ uid: uid }).toPromise().then(agent => {
    //   // console.log('getCurrentAgent', agent);
    //   return agent;
    // })

  }



  setStoreUserDetails(user: IUserDetails): Promise<void> {
    return Promise.resolve(
      // this._store.dispatch({ type: travelsActionEnum.clearData })
    )
      .then(() => {
        // console.log(user);
        this.authRepository.setUserDetails(this.createUserObject(user))
      }
      ).then(() => {
        // dispatch action that activate ngrx effects
        // this._store.dispatch({ type: travelsActionEnum.startFetchNextPrivateTravels });
        // this._store.dispatch({ type: travelsActionEnum.startFetchPrivateTravels });
        // this._store.dispatch({ type: travelsActionEnum.startFetchNextSadirTravels });
        // this._store.dispatch({ type: travelsActionEnum.startFetchSadirTravels });
        // this._store.dispatch({ type: orbitsActionEnum.startFetchOrbits });
        // this._store.dispatch({ type: orbitsActionEnum.startFetchOrbitsSadir });
        // this._store.dispatch({ type: carsTypeActionEnum.startFetchCarsType });
        // this._store.dispatch({ type: startLocationsActionEnum.startFetchStartLocations });
      }
      );



  }
  signOut() {
    this.afAuth.auth.signOut().then(() => { this.setStoreUserDetails(this.emptyUser()); }).catch(e => {
      console.log('fail signOut', e);
    });
  }

  get user(): Observable<IUserDetails | null> {
    return this.authRepository.getUserDetails();
  }

  createUserObject(user: IUserDetails): IUserDetails {
    return {
      displayName: user.displayName
      , uid: user.uid
      , email: user.email
      , user: user.user
    };
  }
  emptyUser(): IUserDetails {
    return { displayName: '', uid: '', email: '', user: null };
  }

  

}
