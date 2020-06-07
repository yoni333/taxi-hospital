import { ITravelForm } from '../01-domain/travel-form.interface';


export interface ISelectList<T> {value: T; label: string; }
export function createHours(): ISelectList<number>[] {
  const hours =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(number => ({value: number, label: number.toString()}));
  hours[0].label = '00';
  return hours;
}

export function createMinutes(): ISelectList<number>[] {
  const hours =  [0, 10, 15, 20, 30, 40, 45, 50].map(number => ({value: number, label: number.toString()}));
  hours[0].label = '00';
  return hours;
}

export function isITravelForm(ITravel: ITravelForm): ITravel is ITravelForm {
  return   ( (ITravel as ITravelForm).date !== undefined && (ITravel as ITravelForm).names !== undefined && (ITravel as ITravelForm).additionalData !== undefined)
}
