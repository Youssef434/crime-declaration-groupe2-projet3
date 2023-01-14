import { Localisation } from './declaration/localisation';

export class User {
  id: number = 0;
  fullName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  mle: string = '';
  role: string[] = [];
  token: string = '';
  dateMiseEnService?: Date;
  status: string = '';
  localisation?: Localisation;

  constructor(id: number, fullName: string, token: string) {
    this.id = id;
    this.fullName = fullName;
    this.token = token;
  }
}
