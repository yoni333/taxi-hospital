import { auth } from 'firebase';
import { IUser } from 'src/app/shared/user.interface';

export interface ICustomClaims {
  role: string;
  user:IUser
}


export interface UserCredentialsWithClaims extends auth.UserCredential {
  customClaims: ICustomClaims;
}
