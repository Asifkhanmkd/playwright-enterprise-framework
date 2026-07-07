import { RegisterRequest } from "@projects/toolshop/api/models/registerRequest";

function uniqueSuffix(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function buildRegisterUser(
  overrides: Partial<RegisterRequest> = {},
): RegisterRequest {
  return {
    first_name: "Muhammad",
    last_name: "Asif",

    address: {
      house_number: "21",
      street: "Station Road",
      city: "Dewsbury",
      state: "West Yorkshire",
      country: "United Kingdom",
      postal_code: "WF13 1AA",
    },
    phone: "+447700900123",

    dob: "1990-01-01",

    email: `automation-${uniqueSuffix()}@fakemail.com`,

    password: "Mkd!2026#Qa$7821Xv",

    ...overrides,
  };
}
