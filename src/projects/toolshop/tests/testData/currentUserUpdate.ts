import { RegisterRequest } from "@projects/toolshop/api/models/registerRequest";
import { UpdateUserRequest } from "@projects/toolshop/api/models/updateUserRequest";

export function buildUpdatedUserRequest(user: RegisterRequest): UpdateUserRequest {
  return {
    ...user,
    first_name: "Muhammad updated",
    last_name: "Asif updated",
    phone: "07689564321",

    address: {
      ...user.address,
      city: "Manchester",
    },
  };
}
