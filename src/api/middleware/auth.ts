import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger";

const security = require("atc-security");

/**
 * Fetch user info and store it in the express-session.
 */
async function setUserObj(req: Request) {
  let userObj = await security.getUserObject(req.headers);
  userObj = await security.setPermissions(userObj);
  req.session.userObj = userObj;
}

/**
 * Authenticate any user trying to use the application.
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If the user is not already identified
  if (!req.session.userObj) {
    try {
      // Request user info and store it
      await setUserObj(req);
    } catch (err) {
      // Reject users who cannot be identified
      return next({
        status: 403,
        message: "No user on request.",
      });
    }
  }

  const userPermissions: Array<string> = req.session.userObj.permissions;
  let permissionNeeded: string;

  // Reject users who are not internal employees
  if (!req.session.userObj.internal) {
    return next({
      status: 403,
      message: "Unauthorized",
    });
  }

  // Set the permission required based on the request method
  if (req.method === "POST") {
    permissionNeeded = "";
  }

  // If the user has all of the required permissions, allow them to continue their request
  if (
    !permissionNeeded ||
    (userPermissions && userPermissions.includes(permissionNeeded))
  ) {
    logger.info(
      `Access granted for user ${req.session.userObj.fullName} (${req.session.userObj.id}) for ${req.method} request.`
    );
    return next();
  }
  const failMsg = `User ${req.session.userObj.fullName} (${req.session.userObj.userName}) needs the permission '${permissionNeeded}' for the progen-test component to be able to perform this action.`;
  logger.error(failMsg);

  return next({
    status: 403,
    message: failMsg,
  });
}
