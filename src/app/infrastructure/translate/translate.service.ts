import { Injectable } from '@angular/core';
import { ITranslate, languageEnum } from './translate';
import { translate } from './translate';

@Injectable({ providedIn: 'root' })
export class translateService {
  _allLanguage: ITranslate;
  _dictionary: { [k: string]: string } = {};
  // _currentLanguage: languageEnum = languageEnum.ukraine;
  _currentLanguage: languageEnum = languageEnum.hebrew;
  constructor() {
    this._allLanguage = translate;
    this._dictionary = this.createCurrentLanguage(this._currentLanguage, this._allLanguage);
  }

  createCurrentLanguage(language: languageEnum, allLanguage: ITranslate) {
    const dictionary = {};
    for (const key in allLanguage) {
      dictionary[key] = allLanguage[key][language];
    }
    return dictionary;

  }

  get dictionary() {
    return this._dictionary;
  }

  get currentLanguage(): languageEnum {
    return this._currentLanguage;
  }
}
