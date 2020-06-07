import { IAgent } from '../../../../../../pych/pych-admin/src/app/admin/interfaces/i-agent';

export interface IUserDetails {
  displayName: string
  ; uid: string
  ; email: string;
  agent:IAgent;
}
