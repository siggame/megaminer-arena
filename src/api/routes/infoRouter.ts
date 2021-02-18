import { Router, Request, Response, NextFunction } from "express";

import { projectPackage } from "../../utils/package";

/**
 * Returns information about this application.
 */
async function getInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const info = {
      name: projectPackage.name,
      description: projectPackage.description || "",
      version: projectPackage.version,
      homepage: projectPackage.homepage,
    };

    return res.status(200).json(info);
  } catch (err) {
    return next(err);
  }
}

const router = Router();

router.get("/", getInfo);

export { router };
