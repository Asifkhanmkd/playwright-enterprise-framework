import { Address } from "./address";

export interface RegisterResponse {
  first_name: string;
  last_name: string;
  address: Address;
  phone: number;
  dob: Date;
  email: string;
  id: string;
  created_at: string;
}
