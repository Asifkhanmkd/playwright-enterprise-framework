import { Address } from "./address";

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  address: Address;
  phone: string;
  dob: string;
  password: string;
  email: string;
}
