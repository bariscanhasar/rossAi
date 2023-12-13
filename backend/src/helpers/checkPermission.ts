import {User} from "../orm/model/User/User";
import Logger from "../core/logger";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

function checkPermission(userRole: Role) {

  if (userRole !== Role.SUPERADMIN) {

    throw new Error("Access denied. User does not have access.");
  }
}

export { checkPermission };
