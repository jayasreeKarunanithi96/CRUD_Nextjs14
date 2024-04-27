export interface IUser {
  id?: string;
  name: string;
  email: string;
  linkedinURL: string;
  gender: string;
  address: {
    line1: string;
    line2: string;
    state: string;
    city: string;
    pin: string;
  };
  active?:boolean
 
}
