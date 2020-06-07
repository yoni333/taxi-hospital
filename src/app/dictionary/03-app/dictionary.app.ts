import { Injectable } from '@angular/core';
import { DictionaryRepository } from '../02-repository/dictionary.repository';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DictionaryService {
  constructor(
    private dictionaryRepository: DictionaryRepository
  ) {
    this.setDictionary();
  }

  setDictionary(): void {
    console.log('DictionaryService');
    this.dictionaryRepository.setDictionary().toPromise().then();
  }
}
