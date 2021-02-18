import { Router, Request, Response, NextFunction } from "express";

import { changeMode } from "../../services/arenaService";

/**
 * Returns information about this application.
 */
async function setMode(req: Request, res: Response, next: NextFunction) {
  try {
    const newMode = req.body.mode;
    changeMode(newMode);
    return res.status(200).json({ msg: `Switched mode to ${newMode}` });
  } catch (err) {
    return next(err);
  }
}

const router = Router();

router.post("/", setMode);

export { router };
