export enum EShift {
  first = 'first',
  second = 'second',
  third = 'third',

}

export enum EDirection {
  toHome = 'toHome',
  toWork = 'toWork',

}

export type UID = string;

export interface IUser {
  userUID: UID;
  mail: string;
  fullName: string;
  phone1: string;
  phone2: string;
  address: string;
  neighborhood: string;
  city: string;
  photo?: string;
}
export interface IInvitation {
  id?: string;
  shift: EShift;
  direction: EDirection;
  date: number;
  user: IUser;
}
