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