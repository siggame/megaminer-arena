import { logger } from "../utils/logger";

export enum Modes {
  MatchMaking,
  Tournament,
}

let mode = Modes.MatchMaking;

export function changeMode(newMode) {
  mode = newMode;
}

export async function runArena() {
  logger.info(`Running arena in ${Modes[mode]} mode...`);
  setTimeout(() => {
    runArena();
  }, 2000);
}
