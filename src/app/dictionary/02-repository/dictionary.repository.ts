import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateDictionary, setDictionary, testsD } from 'src/app/infrastructure/ngrx-store/dictionary/dictionary.ngrx';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDictionary } from '../01-domain/dictionary.interface';
import { fsPath } from 'src/app/travels/01-domain/firestore-path.enum';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DictionaryRepository {


  constructor(
     private _store: Store<StateDictionary>
     , private afs: AngularFirestore


  ) { }

    fetchDictionary(): Observable<IDictionary[]> {

      return this.afs.collection<IDictionary>(fsPath.dictionary).valueChanges().pipe(take(1));
    }

    setDictionary(): Observable<any> {
      // this._store.dispatch(this.setDictionary())
      console.log('set dicitonary');

      return this.fetchDictionary().pipe(take(1), tap((dictionary: IDictionary[]) => {
        console.log('dictionary tap', {words: dictionary});
        // ;this._store.dispatch(testsD());
        this._store.dispatch(setDictionary({words: dictionary}));
      }));
    }

}
