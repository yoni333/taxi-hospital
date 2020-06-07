import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../03-app/dictionary.app';
import { Observable } from 'rxjs';
import { StateDictionary, selectDictionaryUkraine } from 'src/app/infrastructure/ngrx-store/dictionary/dictionary.ngrx';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  dictionary: Observable<{}[]>;
  constructor(
    private DictionaryService: DictionaryService
    , private _store: Store<StateDictionary>
  ) { }

  ngOnInit() {
    this.dictionary = this._store.pipe(select(selectDictionaryUkraine));
  }

}
