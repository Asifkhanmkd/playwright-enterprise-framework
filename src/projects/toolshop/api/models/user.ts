import { Address } from "./address";

export interface User {
  id: string;

  first_name: string;
  last_name: string;

  address: Address;

  phone: string;
  dob: string;
  email: string;

  provider: string;
  totp_enabled: boolean;
  enabled: boolean;
  failed_login_attempts: number;
  created_at: string;
}
