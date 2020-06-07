// import { createAction, props } from '@ngrx/store';
// import { Action, createReducer, on } from '@ngrx/store';

// import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
// import { IDictionary } from 'src/app/dictionary/01-domain/dictionary.interface';

// export enum dictionaryActionEnum {
//   setDictionary = '[Dictionary] setDictionary'
//   , test= '[Dictionary] test'
// }

// export const setDictionary = createAction(
//   dictionaryActionEnum.setDictionary,
//   props<{words: IDictionary[]}>()
// );

// export const testsD = createAction(
//   dictionaryActionEnum.test

// );

// export interface StateDictionary {
//   ukraine: IDictionary[];
// }

// export const initialState: StateDictionary = {
//   ukraine: []
// };

// const dictionary = createReducer(
//   initialState,
//   on(
//     testsD,
//     (state: StateDictionary) => {console.log('hi'); return state; }
//   ),
//   on(setDictionary, (state: StateDictionary, {words}) => {
//     console.log('words', words);
//     return({
//       ...state
//       , ukraine: words
//     });

//   }),

// );

// export function dictionaryReducer(state: StateDictionary | undefined, action: Action) {
//   return dictionary(state, action);
// }


// export const selectDictionaryFeature: MemoizedSelector<object, StateDictionary> = createFeatureSelector('dictionary');
// export const selectDictionaryUkraine: MemoizedSelector<object, {}[]> = createSelector(
//   selectDictionaryFeature
//   , (state: StateDictionary) => state.ukraine
// );
