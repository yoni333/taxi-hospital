import { Injectable } from '@angular/core';
// firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { AngularFireFunctions } from '@angular/fire/functions';
// rxjs
import { Observable } from 'rxjs';
import { UserCredentialsWithClaims } from '../01-domain/custom-claims.interface';
import { take } from 'rxjs/operators';
import { IUserDetails } from '../01-domain/user-details.interface';
import { AuthRepository } from '../02-repository/auth-store.repository';
import { Store } from '@ngrx/store';
import { StateTravels } from 'src/app/infrastructure/ngrx-store/travels/travels.reducers';
import { travelsActionEnum } from 'src/app/infrastructure/ngrx-store/travels/travels.actions';
import { orbitsActionEnum, carsTypeActionEnum, setStartLocations, startLocationsActionEnum } from 'src/app/infrastructure/ngrx-store/orbits/orbits.actions';
import { IAgent } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-agent';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: Observable<User | null>;

  constructor(
    public afAuth: AngularFireAuth
    , private fns: AngularFireFunctions
    , private authRepository: AuthRepository
    , private _store: Store<StateTravels>

  ) {
    this._user = this.afAuth.user;
    this.setCurrentUser();
    // console.log('AuthService');
  }


  getCurrentAuth(): Observable<User> {
    return this.afAuth.authState.pipe(take(1));
  }

  setCurrentUser() {
    this.getCurrentAuth().toPromise()


      .then(async (user: User) => {
        const agent = await this.getAgentData(user.uid)

        const tmpUser: IUserDetails = { ...user, agent }
        // console.log('getCurrentAgent:', tmpUser, agent);

        const userForStore: IUserDetails = user === null ? this.emptyUser() : this.createUserObject(tmpUser);
        // console.log('user promise', userForStore);
        this.setStoreUserDetails(userForStore);

      }).catch(console.log);
  }
  login(): Promise<void | auth.UserCredential> {
    // if success the this.afAuth.user will hold the user data as observable
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

  }

  async getAuthAfterRedirect(): Promise<IUserDetails> {
    return this.afAuth.auth.getRedirectResult()
      .then(async (loginData: UserCredentialsWithClaims) => {
        // console.log('loginData', loginData);

        if (loginData.user === null) { return Promise.reject('úser is null'); }
        const agent = await this.getAgentData(loginData.user.uid)
        return <IUserDetails>{
          displayName: loginData.user.displayName,
          uid: loginData.user.uid,
          email: loginData.user.email,
          agent
        }
      })
      .then((user: IUserDetails) => {
        this.setStoreUserDetails(user).then(() => { });

        return user;
      });


  }

  // addCustomClaimsToUserCredentials(loginData: UserCredentialsWithClaims) {
  //   return loginData.user.getIdTokenResult().then((token: auth.IdTokenResult) => {
  //     loginData.customClaims = { role: token.claims.role ,agent:null };
  //     return loginData;

  //   });

  // }

  getAgentData(uid: string): Promise<IAgent> {

    return this.fns.httpsCallable('getCurrentAgent')({ uid: uid }).toPromise().then(agent => {
      // console.log('getCurrentAgent', agent);
      return agent;
    })

  }



  setStoreUserDetails(user: IUserDetails): Promise<void> {
    return Promise.resolve(
      this._store.dispatch({ type: travelsActionEnum.clearData })
    )
      .then(() => {
        // console.log(user);
        this.authRepository.setUserDetails(this.createUserObject(user))
      }
      ).then(() => {
        // dispatch action that activate ngrx effects
        this._store.dispatch({ type: travelsActionEnum.startFetchNextPrivateTravels });
        this._store.dispatch({ type: travelsActionEnum.startFetchPrivateTravels });
        this._store.dispatch({ type: travelsActionEnum.startFetchNextSadirTravels });
        this._store.dispatch({ type: travelsActionEnum.startFetchSadirTravels });
        this._store.dispatch({ type: orbitsActionEnum.startFetchOrbits });
        this._store.dispatch({ type: orbitsActionEnum.startFetchOrbitsSadir });
        this._store.dispatch({ type: carsTypeActionEnum.startFetchCarsType });
        this._store.dispatch({ type: startLocationsActionEnum.startFetchStartLocations });
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
      , agent: user.agent
    };
  }
  emptyUser(): IUserDetails {
    return { displayName: '', uid: '', email: '', agent: null };
  }

}
