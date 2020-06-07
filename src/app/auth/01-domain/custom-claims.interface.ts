import { auth } from 'firebase';
import { IAgent } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-agent';

export interface ICustomClaims {
  role: string;
  agent:IAgent
}


export interface UserCredentialsWithClaims extends auth.UserCredential {
  customClaims: ICustomClaims;
}
