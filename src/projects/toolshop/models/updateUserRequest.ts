import { Address } from "./address";

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  address: Address;
  phone: string;
  dob: string;
  password: string;
  email: string;
}
