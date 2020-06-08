import { Injectable } from '@angular/core';
import { IUser, IInvitation } from '../01-domain/invite.interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/03-app/auth-service';
import { Store, select } from '@ngrx/store';
import { StateLogin } from 'src/app/infrastructure/ngrx-store/login/login.reducers';
import { selectUser } from 'src/app/infrastructure/ngrx-store/login/login.selectors';
import { switchMap } from 'rxjs/operators';
import { TRAVELS_PATH } from 'src/app/shared/fs-path';

@Injectable({ providedIn: 'root' })
export class IAdminInvitationService {
  // TODO remove it to share utils
  readonly TRAVELS_PATH = TRAVELS_PATH;
  invitationCollection: AngularFirestoreCollection<IInvitation>;
  constructor(
    private fs: AngularFirestore,
    private store:Store <StateLogin>,
    private auth:AuthService,
  ) {
    this.setDB();
   
  }

  setDB() {
    this.invitationCollection = this.fs.collection(this.TRAVELS_PATH);
  }

  get currentUser(): Observable<IUser> {
    return this.store.pipe(select(selectUser))
  }
  

  getAllInvitation():Observable<IInvitation[]>{
    const yesterday = moment().subtract(1, 'days').valueOf();
    console.log('yesterday', yesterday);

    return this.fs.collection<IInvitation>(this.TRAVELS_PATH
    , ref => ref.where('date', '>=', yesterday))
    .valueChanges()
  }

 
 
  
  createUnixDate(date: moment.Moment): number {
    return date.valueOf();
  }
}
