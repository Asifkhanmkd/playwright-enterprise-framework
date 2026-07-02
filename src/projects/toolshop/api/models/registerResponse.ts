/* export interface RegisterRequest{
  first_name: string;
  last_name: string;
  address: {
    house_number: number;
    city:string;
    state:string;
    country:string;
    postal_code: string
  },
  phone: number;
  dob: Date;
  email: string;
  id: string;
  provider: string;
  totp_enabled: boolean;
  enabled: boolean;
  failed_login_attempt: number;
  created_at: Date

}
 */

import {User} from "./user";

export interface RegisterResponse extends User{

}