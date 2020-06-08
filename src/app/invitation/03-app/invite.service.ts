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
export class InvitationService {
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
  

  addInvitation(invitation: IInvitation): Promise<DocumentReference> {
    console.log(invitation);

    if  ( invitation.user ===undefined ){
      this.bugFix()
    }
    return this.invitationCollection.add(invitation);
  }

  bugFix(){
  }

  deleteTravel(id: string) {
    this.invitationCollection.doc(id).delete().catch(res => { alert('בעיה במחיקה.נסה שנית'); });
  }

  getUserInvitations(): Observable<IInvitation[]> {

    // TODO get yesterday midnight
    const yesterday = moment().subtract(1, 'days').valueOf();
    console.log('yesterday', yesterday);

    return  this.currentUser.pipe(
      switchMap(user=>{
        console.log(user.userUID);
        
        return   this.fs.collection<IInvitation>(this.TRAVELS_PATH
          , ref => ref.where('date', '>=', yesterday)
          .where('user.userUID','==',user.userUID)
          .orderBy('date', 'asc')).valueChanges({ idField: 'id' });

      })
    )
  
  }

  
  createUnixDate(date: moment.Moment): number {
    return date.valueOf();
  }
}
