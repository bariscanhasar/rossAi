import {User} from "../orm/model/User/User";
import Logger from "../core/logger";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

function checkPermission(userRole: Role) {
  console.log(userRole);
  if (userRole !== Role.SUPERADMIN) {

    throw new Error("Access denied. User does not have SUPERADMIN role.");
  }
}

export { checkPermission };
